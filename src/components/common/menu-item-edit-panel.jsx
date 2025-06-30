import { useState, useEffect } from "react"
import Button from "./button"
import { X } from "lucide-react"
import { MenuService } from "../../services/MenuService"
import { RestaurantsService } from "../../services/Restaurants"
import { Select, MenuItem, FormControl, InputLabel, OutlinedInput, Chip, Box } from "@mui/material"

const FOOD_ALLERGENS = [
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree Nuts",
  "Peanuts",
  "Wheat",
  "Soy",
  "Sesame"
]

const DIETARY_RESTRICTIONS = [
  "Gluten",
  "Dairy",
  "Egg",
  "Soy",
  "Nut",
  "Shellfish",
  "Fish",
  "Alcohol",
  "Kosher",
  "Halal",
  "Vegetarian",
  "Vegan",
  "Pescatarian"
]

const ACCOMMODATIONS = [
  "Vegan",
  "Vegetarian",
  "Gluten-Free",
  "Dairy-Free",
  "Nut-Free",
  "Soy-Free",
  "Sesame-Free"
]

export default function MenuItemEditPanel({ item, onClose, onSave, isSaving }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: [],
    price: "",
    ingredients: [],
    allergens: [],
    accommodations: [],
    dietary_restrictions: [],
    substitutions: [],
    can_substitute: true,
    temperature: "Hot",
    notes: "",
    status: true,
    restaurant_uuid: ""
  })

  const [newIngredient, setNewIngredient] = useState("")
  const [newAccommodation, setNewAccommodation] = useState("")
  const [newSubstitution, setNewSubstitution] = useState("")
  const [newAllergen, setNewAllergen] = useState("")
  const [newDietaryRestriction, setNewDietaryRestriction] = useState("")
  const [error, setError] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [validationErrors, setValidationErrors] = useState({})
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
        type: Array.isArray(item.type) ? item.type : [item.type],
        dietary_restrictions: Array.isArray(item.dietary_restrictions)
          ? item.dietary_restrictions
          : (typeof item.dietary_restrictions === "object" && item.dietary_restrictions !== null)
            ? [
                ...(item.dietary_restrictions.health || []),
                ...(item.dietary_restrictions.belief || []),
                ...(item.dietary_restrictions.lifestyle || [])
              ]
            : [],
        substitutions: Array.isArray(item.substitutions) ? item.substitutions : [],
        accommodations: Array.isArray(item.accommodations) ? item.accommodations : [],
        can_substitute: typeof item.can_substitute === 'boolean' ? item.can_substitute : true
      })
      const imageUrl = item.image_url || "";
      const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

      let finalImageUrl;

      // Check if the imageUrl is a relative path
      if (imageUrl.startsWith('/')) {
        // It's a relative image path
        finalImageUrl = `${baseUrl}${imageUrl}`;
      } else {
        // It's an absolute URL or local file
        finalImageUrl = imageUrl;
      }

      setImagePreview(finalImageUrl);
    }
  }, [item])

  useEffect(() => {
    // Fetch restaurants for dropdown
    const fetchRestaurants = async () => {
      try {
        const data = await RestaurantsService.getAllRestaurants()
        setRestaurants(data)
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchRestaurants()
  }, [])

  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }
    
    if (!formData.type.length) {
      errors.type = "Type is required"
    }
    
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      errors.price = "Valid price is required"
    }
    
    if (!formData.ingredients.length) {
      errors.ingredients = "At least one ingredient is required"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
    // Clear validation error when field is modified
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file')
        return
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB')
        return
      }
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
      setError(null)
    }
  }

  const handleAddIngredient = () => {
    if (newIngredient.trim() && !formData.ingredients.includes(newIngredient.trim())) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, newIngredient.trim()],
      })
      setNewIngredient("")
      // Clear validation error when ingredient is added
      if (validationErrors.ingredients) {
        setValidationErrors(prev => ({
          ...prev,
          ingredients: undefined
        }))
      }
    }
  }

  const handleRemoveIngredient = (ingredient) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((i) => i !== ingredient),
    })
  }

  const handleAddAccommodation = () => {
    if (newAccommodation.trim() && !formData.accommodations.includes(newAccommodation.trim())) {
      setFormData({
        ...formData,
        accommodations: [...formData.accommodations, newAccommodation.trim()],
      })
      setNewAccommodation("")
    }
  }

  const handleRemoveAccommodation = (accommodation) => {
    setFormData({
      ...formData,
      accommodations: formData.accommodations.filter((a) => a !== accommodation),
    })
  }

  const handleAccommodationChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      accommodations: typeof value === 'string' ? value.split(',') : value,
    });
  }

  const handleAddSubstitution = () => {
    if (newSubstitution.trim() && !formData.substitutions.includes(newSubstitution.trim())) {
      setFormData({
        ...formData,
        substitutions: [...formData.substitutions, newSubstitution.trim()],
      })
      setNewSubstitution("")
    }
  }

  const handleRemoveSubstitution = (substitution) => {
    setFormData({
      ...formData,
      substitutions: formData.substitutions.filter((s) => s !== substitution),
    })
  }
  
  const handleAddAllergen = () => {
    if (newAllergen.trim() && !formData.allergens.includes(newAllergen.trim())) {
      setFormData({
        ...formData,
        allergens: [...formData.allergens, newAllergen.trim()],
      })
      setNewAllergen("")
    }
  }
  
  const handleRemoveAllergen = (allergen) => {
    setFormData({
      ...formData,
      allergens: formData.allergens.filter((a) => a !== allergen),
    })
  }

  const handleAddDietaryRestriction = () => {
    if (newDietaryRestriction.trim() && !formData.dietary_restrictions.includes(newDietaryRestriction.trim())) {
      setFormData({
        ...formData,
        dietary_restrictions: [...formData.dietary_restrictions, newDietaryRestriction.trim()],
      })
      setNewDietaryRestriction("")
    }
  }

  const handleRemoveDietaryRestriction = (restriction) => {
    setFormData({
      ...formData,
      dietary_restrictions: formData.dietary_restrictions.filter((r) => r !== restriction),
    })
  }

  const handleAllergenChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      allergens: typeof value === 'string' ? value.split(',') : value,
    });
  }

  const handleDietaryRestrictionChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      dietary_restrictions: typeof value === 'string' ? value.split(',') : value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    try {
      setError(null)
      // Create a new object without the unwanted fields
      const filteredFormData = { ...formData }
      delete filteredFormData.image_url
      delete filteredFormData.__v
      delete filteredFormData.categoryDisplay
      delete filteredFormData.typeDisplay
      delete filteredFormData.dietaryDisplay
      delete filteredFormData.temperatureDisplay
      delete filteredFormData._id

      // Group dietary restrictions before sending to backend
      const dietaryRestrictionsMap = {
        health: ["Gluten", "Dairy", "Egg", "Soy", "Nut", "Shellfish", "Fish", "Alcohol"],
        belief: ["Kosher", "Halal"],
        lifestyle: ["Vegetarian", "Vegan", "Pescatarian"]
      };
      const groupedDietaryRestrictions = {
        health: [],
        belief: [],
        lifestyle: []
      };
      (formData.dietary_restrictions || []).forEach(r => {
        if (dietaryRestrictionsMap.health.includes(r)) groupedDietaryRestrictions.health.push(r);
        else if (dietaryRestrictionsMap.belief.includes(r)) groupedDietaryRestrictions.belief.push(r);
        else if (dietaryRestrictionsMap.lifestyle.includes(r)) groupedDietaryRestrictions.lifestyle.push(r);
      });
      filteredFormData.dietary_restrictions = groupedDietaryRestrictions;

      onSave(filteredFormData, imageFile)
    } catch (err) {
      setError(err.message || 'Failed to save dish')
    }
  }

  const handleDelete = async () => {
    if (!item?.id) return
    
    if (window.confirm('Are you sure you want to delete this dish?')) {
      try {
        await MenuService.deleteDish(item.id)
        onClose()
      } catch (err) {
        setError(err.message || 'Failed to delete dish')
      }
    }
  }

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-1/2 lg:w-[50%] bg-white border-l border-gray-200 shadow-lg z-50 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{item ? "Edit Menu Item" : "Add Menu Item"}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Image Upload */}
        <div className="border bg-background border-dashed border-gray-300 rounded-lg p-4 text-center">
          <div className="flex flex-col items-center justify-center">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="h-32 w-32 object-cover rounded-md mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-gray-400 cursor-pointer"
            >
              {imagePreview ? "Change Image" : "Upload Image"}
            </label>
            <p className="text-sm text-gray-500 mt-2">Max file size: 5MB</p>
          </div>
        </div>

        <div className="flex justify-between gap-11 items-baseline">
          {/* Dish Name */}
          <div className="w-[400px]">
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Dish Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border bg-background border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                validationErrors.name ? 'border-red-500' : ''
              }`}
              required
            />
            {validationErrors.name && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="w-[400px]">
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter dish description..."
              rows={3}
              className="w-full p-2 border bg-background border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Restaurant Dropdown */}
        <div className="w-[400px]">
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Restaurant*</label>
          <select
            name="restaurant_uuid"
            value={formData.restaurant_uuid || ""}
            onChange={handleChange}
            className={`w-full p-2 bg-background border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${validationErrors && validationErrors.restaurant_uuid ? 'border-red-500' : ''}`}
            required
          >
            <option value="">Select Restaurant</option>
            {restaurants.map(r => (
              <option key={r.uuid} value={r.uuid}>{r.name}</option>
            ))}
          </select>
          {validationErrors && validationErrors.restaurant && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.restaurant}</p>
          )}
        </div>

        {/* Type and Price */}
        <div className="flex justify-between gap-11 items-baseline">
          <div className="w-[400px]">
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Type*</label>
            <select
              name="type"
              value={formData.type[0] || ""}
              onChange={(e) => {
                setFormData({ ...formData, type: [e.target.value] })
                if (validationErrors.type) {
                  setValidationErrors(prev => ({
                    ...prev,
                    type: undefined
                  }))
                }
              }}
              className={`w-full p-2 bg-background border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                validationErrors.type ? 'border-red-500' : ''
              }`}
              required
            >
              <option value="">Select Type</option>
              <option value="appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Pizza">Pizza</option>
              <option value="Pasta">Pasta</option>
              <option value="Salad">Salad</option>
              <option value="Soup">Soup</option>
              <option value="Sandwich">Sandwich</option>
            </select>
            {validationErrors.type && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.type}</p>
            )}
          </div>

          <div className="w-[400px]">
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Price*</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`w-full bg-background p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                validationErrors.price ? 'border-red-500' : ''
              }`}
              required
            />
            {validationErrors.price && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.price}</p>
            )}
          </div>
        </div>

        {/* Temperature */}
        <div className="w-[400px]">
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Temperature</label>
          <select
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            className="w-full p-2 bg-background border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="Hot">Hot</option>
            <option value="Cold">Cold</option>
            <option value="Room Temperature">Room Temperature</option>
          </select>
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Ingredients*</label>
          <div className="flex">
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Type to search ingredients..."
              className={`flex-1 p-2 border bg-background border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                validationErrors.ingredients ? 'border-red-500' : ''
              }`}
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="px-3 py-2 bg-primary text-white rounded-r-md hover:bg-gray-400"
            >
              Add
            </button>
          </div>
          {validationErrors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.ingredients}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center bg-iconbackground rounded-full px-3 py-1">
                <span className="text-sm">{ingredient}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(ingredient)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Allergens */}
        <div>
          <FormControl fullWidth margin="normal">
            <InputLabel id="allergens-label">Allergens</InputLabel>
            <Select
              labelId="allergens-label"
              className="bg-background"
              multiple
              value={formData.allergens}
              onChange={handleAllergenChange}
              input={<OutlinedInput label="Allergens" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {FOOD_ALLERGENS.map((allergen) => (
                <MenuItem key={allergen} value={allergen}>
                  {allergen}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Dietary Restrictions */}
        <div>
          <FormControl fullWidth margin="normal">
            <InputLabel id="dietary-restrictions-label">Dietary Restrictions</InputLabel>
            <Select
              labelId="dietary-restrictions-label"
               className="bg-background"
              multiple
              value={formData.dietary_restrictions}
              onChange={handleDietaryRestrictionChange}
              input={<OutlinedInput label="Dietary Restrictions" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {DIETARY_RESTRICTIONS.map((restriction) => (
                <MenuItem key={restriction} value={restriction}>
                  {restriction}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Accommodations */}
        <div>
          <FormControl fullWidth margin="normal">
            <InputLabel id="accommodations-label">Accommodations</InputLabel>
            <Select
              labelId="accommodations-label"
              className="bg-background"
              multiple
              value={formData.accommodations}
              onChange={handleAccommodationChange}
              input={<OutlinedInput label="Accommodations" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {ACCOMMODATIONS.map((accommodation) => (
                <MenuItem key={accommodation} value={accommodation}>
                  {accommodation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Substitution Allowed Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Substitutions</label>
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              className={`px-8 py-3 rounded-lg text-base font-medium focus:outline-none transition-colors ${formData.can_substitute ? 'bg-[#C1121F] text-white border border-[#C1121F]' : 'bg-white text-black border border-gray-300'}`}
              onClick={() => setFormData({ ...formData, can_substitute: true })}
            >
              Allowed
            </button>
            <button
              type="button"
              className={`px-8 py-3 rounded-lg text-base font-medium focus:outline-none transition-colors ${!formData.can_substitute ? 'bg-[#C1121F] text-white border border-[#C1121F]' : 'bg-white text-black border border-gray-300'}`}
              onClick={() => setFormData({ ...formData, can_substitute: false })}
            >
              Not Allowed
            </button>
          </div>
        </div>
        {/* Substitutions List */}
        {formData.can_substitute && (
          <div>
            <div className="flex">
              <input
                type="text"
                value={newSubstitution}
                onChange={(e) => setNewSubstitution(e.target.value)}
                placeholder="Add substitution option..."
                className="flex-1 p-2 border bg-background border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <button
                type="button"
                onClick={handleAddSubstitution}
                className="px-3 py-2 bg-primary text-white rounded-r-md hover:bg-gray-400"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.substitutions.map((substitution, index) => (
                <div key={index} className="flex items-center bg-iconbackground rounded-full px-3 py-1">
                  <span className="text-sm">{substitution}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubstitution(substitution)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes..."
            rows={3}
            className="w-full bg-background p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Status */}
        <div className="text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-textcolor"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">{formData.status ? "Active" : "Inactive"}</span>
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-between space-x-2 pt-4">
          
          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-gray-400" disabled={isSaving}>
              {isSaving ? "Saving..." : (item ? "Save Changes" : "Add Item")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
