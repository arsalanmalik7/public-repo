import React, { useEffect, useState } from 'react';
import CompletedLessonsTable from '../components/common/TrainingProgressTable';
import Card from '../components/common/card';
import Button from '../components/common/button';
import Dropdown from '../components/common/dropdown';
import Badge from '../components/common/badge';
import ProgressBar from '../components/common/progressBar';
import { getUserProgress } from '../services/progress';

const TrainingProgressPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await getUserProgress();
        setProgressData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!progressData) {
    return <div className="p-4">No data available</div>;
  }

  const metrics = {
    overallProgress: progressData.overAllProgress,
    lessonsCompleted: progressData.completedLessons,
    totalLessons: progressData.allLessons,
    averageScore: progressData.averageScore,
    averageAttempts: progressData.averageAttempts
  };

  const progressSummary = {
    food: {
      chaptersCompleted: progressData.food.foodCompletedLessons,
      totalChapters: progressData.allLessons / 2, // Assuming equal distribution
      averageScore: progressData.food.foodAverageScoreInPercentage,
      averageAttempts: progressData.food.foodAverageAttempts,
      unitsCompleted: Math.ceil(progressData.food.foodCompletedLessons / 4), // Assuming 4 chapters per unit
      totalUnits: Math.ceil((progressData.allLessons / 2) / 4),
      nextChapter: progressData.food.foodDueLessons[0]?.chapter_name || 'No upcoming chapters'
    },
    wine: {
      chaptersCompleted: progressData.wine.wineCompletedLessons,
      totalChapters: progressData.allLessons / 2, // Assuming equal distribution
      averageScore: progressData.wine.wineAverageScoreInPercentage,
      averageAttempts: progressData.wine.wineAverageAttempts,
      unitsCompleted: Math.ceil(progressData.wine.wineCompletedLessons / 4), // Assuming 4 chapters per unit
      totalUnits: Math.ceil((progressData.allLessons / 2) / 4),
      nextChapter: progressData.wine.wineDueLessons[0]?.chapter_name || 'No upcoming chapters'
    }
  };

  const completedLessons = progressData.completedLessonsByUser.map(lesson => ({
    title: `${lesson.category.charAt(0).toUpperCase() + lesson.category.slice(1)} Unit ${lesson.unit}, Chapter ${lesson.chapter}: ${lesson.chapter_name}`,
    completionDate: new Date(lesson.progress.completedAt).toLocaleDateString(),
    score: `${lesson.progress.score}%`,
    attempts: lesson.progress.attempts.length
  }));

  // Calculate days remaining for next due lesson
  const getDaysRemaining = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nextDueLesson = progressData.dueLessons[0];
  const daysRemaining = nextDueLesson ? getDaysRemaining(nextDueLesson.DueDate) : 0;

  return (
    <div className="p-4 sm:p-6 max-w-8xl mx-auto space-y-6 min-h-screen">
      {/* Overall Training Metrics */}
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-left text-black">Overall Training Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Overall Progress Card */}
          <Card className="rounded-xl p-0 flex flex-col items-center justify-center min-h-[170px]">
            <div className="flex flex-col items-center justify-center w-full h-full py-4">
              <div className="relative w-32 h-32 mb-2">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#FDE8E8" strokeWidth="4" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#C1121F" strokeWidth="4" 
                    strokeDasharray={`${metrics.overallProgress} ${100 - metrics.overallProgress}`} 
                    strokeDashoffset="25" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-black">{metrics.overallProgress}%</span>
                </div>
              </div>
              <div className="text-center text-sm text-black mt-1">Overall Progress</div>
            </div>
          </Card>
          {/* Lessons Completed Card */}
          <Card className="border border-gray-300 rounded-xl p-0 flex flex-col items-center justify-center min-h-[170px]">
            <div className="flex flex-col items-center justify-center w-full h-full py-4">
              <div className="relative w-32 h-32 mb-2">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#FDE8E8" strokeWidth="4" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#C1121F" strokeWidth="4" 
                    strokeDasharray={`${(metrics.lessonsCompleted / metrics.totalLessons) * 100} ${100 - (metrics.lessonsCompleted / metrics.totalLessons) * 100}`} 
                    strokeDashoffset="0" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-black">{metrics.lessonsCompleted}/{metrics.totalLessons}<br /><span className='text-sm font-normal'>Lessons</span></span>
                </div>
              </div>
              <div className="text-center text-sm text-black mt-1">Lessons Completed</div>
            </div>
          </Card>
          {/* Average Score Card */}
          <Card className="rounded-xl p-0 flex flex-col items-center justify-center min-h-[170px]">
            <div className="flex flex-col items-center justify-center w-full h-full py-4">
              <div className="relative w-32 h-20 mb-2">
                <svg className="w-full h-full" viewBox="0 0 36 18">
                  <path d="M2 16 A16 16 0 0 1 34 16" fill="none" stroke="#FDE8E8" strokeWidth="4" />
                  <path d="M2 16 A16 16 0 0 1 34 16" fill="none" stroke="#C1121F" strokeWidth="4" 
                    strokeDasharray={`${metrics.averageScore} ${100 - metrics.averageScore}`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-black">{metrics.averageScore}%</span>
                </div>
              </div>
              <div className="text-center text-sm text-black mt-1">Average Score</div>
            </div>
          </Card>
          {/* Average Attempts Card */}
          <Card className="rounded-xl p-0 flex flex-col items-center justify-center min-h-[170px]">
            <div className="flex flex-col items-center justify-center w-full h-full py-4">
              <div className="w-full flex flex-col items-center justify-center mb-2">
                <span className="text-xl font-bold text-[#C1121F] mb-1">{metrics.averageAttempts}</span>
                <div className="flex items-center w-full">
                  <div className="flex-1 h-1 bg-[#FDE8E8] rounded-full relative">
                    <div className="absolute left-0 top-0 h-1 bg-[#C1121F] rounded-full" style={{ width: `${(metrics.averageAttempts / 3) * 100}%` }}></div>
                  </div>
                </div>
                <div className="text-sm text-[#C1121F] mt-1">per lesson</div>
              </div>
              <div className="text-center text-sm text-black mt-1">Average Attempts</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Next Lesson Due */}
      <Card className="rounded-xl p-0 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 pt-3 pb-2 gap-2 sm:gap-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#C1121F] rounded-full"></span>
            <span className="text-base sm:text-lg font-semibold text-black">Next Lesson Due</span>
          </div>
          <span className="text-sm sm:text-base text-gray-600">{daysRemaining} Days Remaining</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 pb-4">
          {/* Food Lesson Card */}
          <div className="rounded-lg p-3 flex flex-col gap-2 bg-white">
            <div className="flex items-center gap-2 text-[#C1121F] font-semibold text-base">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              {progressData.food.foodDueLessons[0]?.unit_name || 'No upcoming lessons'}
            </div>
            <Button variant="primary" size="md" className="w-full !rounded !py-2 !text-base !font-semibold">
              {progressData.food.foodDueLessons[0]?.progress?.[0]?.status === 'in_progress' ? 'In Progress' : 'Not Started'}
            </Button>
          </div>
          {/* Wine Lesson Card */}
          <div className="rounded-lg p-3 flex flex-col gap-2 bg-white">
            <div className="flex items-center gap-2 text-[#C1121F] font-semibold text-base">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              {progressData.wine.wineDueLessons[0]?.unit_name || 'No upcoming lessons'}
            </div>
            <Button size="md" className="w-full !rounded !py-2 !text-base !font-semibold">
              {progressData.wine.wineDueLessons[0]?.progress?.[0]?.status === 'in_progress' ? 'In Progress' : 'Not Started'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Food and Wine Lessons Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Food Lessons */}
        <Card className="rounded-xl p-0">
          <div className="px-4 pt-3 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-4 h-4 flex items-center justify-center text-[#C1121F]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </span>
              <span className="text-lg font-semibold text-black">Food Lessons</span>
            </div>
            <div className="flex justify-between text-base mb-1">
              <span className="text-black">Chapters Completed</span>
              <span className="text-black font-bold">{progressSummary.food.chaptersCompleted}/{progressSummary.food.totalChapters}</span>
            </div>
            <ProgressBar value={progressSummary.food.chaptersCompleted} max={progressSummary.food.totalChapters} showLabel={false} variant="primary" className="mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-background rounded-md p-3 text-center">
                <div className="text-base font-bold text-black">{progressSummary.food.averageScore}%</div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
              <div className="bg-background rounded-md p-3 text-center">
                <div className="text-base font-bold text-black">{progressSummary.food.averageAttempts}</div>
                <div className="text-sm text-gray-600">Average Attempts</div>
              </div>
              <div className="bg-background rounded-md p-3 text-center">
                <div className="text-base font-bold text-black">{progressSummary.food.unitsCompleted}/{progressSummary.food.totalUnits}</div>
                <div className="text-sm text-gray-600">Units Completed</div>
              </div>
              <div className="bg-background rounded-md p-3 text-center">
                <div className="text-base font-bold text-black">{progressSummary.food.nextChapter}</div>
                <div className="text-sm text-gray-600">Next Chapter</div>
              </div>
            </div>
          </div>
        </Card>
        {/* Wine Lessons */}
        <Card className="rounded-xl p-0">
          <div className="px-4 pt-3 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-4 h-4 flex items-center justify-center text-[#C1121F]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </span>
              <span className="text-lg font-semibold text-black">Wine Lessons</span>
            </div>
            <div className="flex justify-between text-base mb-1">
              <span className="text-black">Chapters Completed</span>
              <span className="text-black font-bold">{progressSummary.wine.chaptersCompleted}/{progressSummary.wine.totalChapters}</span>
            </div>
            <ProgressBar value={progressSummary.wine.chaptersCompleted} max={progressSummary.wine.totalChapters} showLabel={false} variant="primary" className="mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-background rounded-md p-3 text-center">
                <div className="text-base font-bold text-black">{progressSummary.wine.averageScore}%</div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
              <div className="bg-background rounded-md p-3 text-center">
                <div className="text-base font-bold text-black">{progressSummary.wine.averageAttempts}</div>
                <div className="text-sm text-gray-600">Average Attempts</div>
              </div>
              <div className="bg-background rounded-md p-3 text-center">
                <div className="text-base font-bold text-black">{progressSummary.wine.unitsCompleted}/{progressSummary.wine.totalUnits}</div>
                <div className="text-sm text-gray-600">Units Completed</div>
              </div>
              <div className="bg-background rounded-md p-3 text-center">
                <div className="text-base font-bold text-black">{progressSummary.wine.nextChapter}</div>
                <div className="text-sm text-gray-600">Next Chapter</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Completed Lessons Table */}
      <Card className="border border-gray-200 overflow-x-auto">
        <div className="pb-0 min-w-[340px] sm:min-w-0">
          <CompletedLessonsTable lessons={completedLessons} />
        </div>
      </Card>
    </div>
  );
};

export default TrainingProgressPage;
