import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from "../components/common/button"
import StatCard from "../components/common/stat-card"
import RestaurantCard from "../components/common/restaurant-card"
import ActivityFeed from "../components/common/activity-feed"
import TrainingProgress from "../components/common/training-progress"
import ViewEmployeesPanel from "../components/common/view-employees-panel"
import LessonProgressPanel from "../components/common/lesson-progress-panel"
import ManageRestaurantPanel from "../components/common/manage-restaurant-panel"
import ManageMenuPanel from "../components/common/manage-menu-panel"
import { RestaurantsService } from '../services/Restaurants'
import { DashboardService } from '../services/dashboard'

export default function Dashboard() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSidePanel, setActiveSidePanel] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalManagers: 0,
    menuItems: 0,
    wineList: 0,
    trainingRate: 0,
    missedTraining: 0,
    menuUpdates: 0
  });
  const [activityLogs, setActivityLogs] = useState([]);
  const [lessonProgress, setLessonProgress] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantsData, statsData, logsData, progressData] = await Promise.all([
          RestaurantsService.getAllRestaurants(),
          DashboardService.getAllStats(),
          DashboardService.getActivityLogs(),
          DashboardService.getUserLessonProgress()
        ]);
        
        setRestaurants(restaurantsData);
        setStats(statsData);
        setActivityLogs(logsData.logs || []);
        setLessonProgress(progressData);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenSidePanel = (panel, restaurant = null) => {
    setActiveSidePanel(panel);
    setSelectedRestaurant(restaurant);
  };

  const handleCloseSidePanel = () => {
    setActiveSidePanel(null);
    setSelectedRestaurant(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 overflow-auto">
        <main className="p-3 ">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 mb-6">
            <StatCard title="Total Employees" value={stats.totalEmployees} icon="users" />
            <StatCard title="Total Managers" value={stats.totalManagers} icon="user-check" />
            <StatCard title="Menu Items" value={stats.totalMenuItem || 0} icon="utensils" />
            <StatCard title="Wine List" value={stats.wineList} icon="wine-glass" />
            <StatCard title="Training Rate" value={`${(stats.trainingRate || 0).toFixed(1)}%`} icon="graduation-cap" trend="up" />
            <StatCard title="Missed Training" value={`${(stats.missedTrainingRate || 0).toFixed(1)}%`} icon="exclamation-triangle" subtext={`${Math.round((stats.totalEmployees || 0) * ((stats.missedTrainingRate || 0) / 100))} users`} />
            <StatCard title="Menu Updates" value={stats.menuUpdates} icon="sync" subtext={`${(stats.lastMenuUpdateInDays || 0).toFixed(1)}d`} />
          </div>

          {/* Restaurants Section */}
          {restaurants.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-textcolor">Restaurants</h2>
                <Button 
                  variant="primary" 
                  size="md"
                  onClick={() => navigate('/restaurant-management')}
                >
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {loading ? (
                  <div>Loading restaurants...</div>
                ) : error ? (
                  <div className="text-red-500">{error}</div>
                ) : (
                  restaurants.slice(0, 2).map((restaurant) => (
                    <RestaurantCard
                      key={restaurant._id}
                      name={restaurant.name}
                      address={`${restaurant.address.street}, ${restaurant.address.city}, ${restaurant.address.state} ${restaurant.address.zip}`}
                      status={restaurant.status}
                      employeeCount={restaurant.employees?.filter(emp => emp !== null).length || 0}
                      menuItemCount={restaurant.current_dishes?.length || 0}
                      trainingCompletion={0}
                      onViewEmployees={() => handleOpenSidePanel("viewEmployees", restaurant)}
                      onManageMenu={() => handleOpenSidePanel("manageMenu", restaurant)}
                      onLessonProgress={() => handleOpenSidePanel("lessonProgress", restaurant)}
                      onManageRestaurant={() => handleOpenSidePanel("manageRestaurant", restaurant)}
                    />
                  ))
                )}
              </div>
            </div>
          )}

          {/* Activity and Training Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityFeed logs={activityLogs} loading={loading} />
            {lessonProgress && <TrainingProgress progress={lessonProgress} loading={loading} />}
          </div>
        </main>
      </div>

      {/* Side Panels */}
      {activeSidePanel === "viewEmployees" && (
        <ViewEmployeesPanel
          restaurant={selectedRestaurant}
          onClose={handleCloseSidePanel}
        />
      )}

      {activeSidePanel === "lessonProgress" && (
        <LessonProgressPanel
          restaurant={selectedRestaurant}
          onClose={handleCloseSidePanel}
        />
      )}

      {activeSidePanel === "manageRestaurant" && (
        <ManageRestaurantPanel
          restaurant={selectedRestaurant}
          onClose={handleCloseSidePanel}
        />
      )}

      {activeSidePanel === "manageMenu" && (
        <ManageMenuPanel
          restaurant={selectedRestaurant}
          onClose={handleCloseSidePanel}
        />
      )}
    </div>
  )
}
