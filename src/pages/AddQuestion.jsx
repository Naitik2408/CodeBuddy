import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion } from '../features/question/questionSlice';

const AddQuestion = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.question);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sourceUrl: '',
    difficulty: 'Medium',
    category: 'Array',
    tags: '',
    platform: 'LeetCode'
  });

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const categories = [
    'Array', 'String', 'Hash Table', 'Dynamic Programming', 
    'Math', 'Sorting', 'Greedy', 'Depth-First Search',
    'Database', 'Binary Search', 'Tree', 'Breadth-First Search',
    'Matrix', 'Two Pointers', 'Binary Tree', 'Heap', 'Stack',
    'Graph', 'Design', 'Simulation', 'Backtracking', 'Linked List'
  ];
  const platforms = ['LeetCode', 'HackerRank', 'CodeForces', 'GeeksforGeeks', 'InterviewBit', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare question data
    const questionData = {
      ...formData,
      groupId,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
    };

    try {
      await dispatch(createQuestion(questionData)).unwrap();
      navigate(`/group/${groupId}`);
    } catch (err) {
      console.error('Error creating question:', err);
    }
  };

  const extractFromUrl = () => {
    const url = formData.sourceUrl;
    if (!url) return;

    try {
      // Extract title and details from LeetCode URL
      if (url.includes('leetcode.com')) {
        const urlParts = url.split('/');
        const problemSlug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
        const title = problemSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        setFormData(prev => ({
          ...prev,
          title: title || prev.title,
          platform: 'LeetCode'
        }));
      }
      // Add similar logic for other platforms
    } catch (error) {
      console.error('Error extracting from URL:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate(`/group/${groupId}`)}
              className="text-blue-600 hover:text-blue-800 mr-4 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Group
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Add New Question</h1>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Source URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Problem URL *
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  name="sourceUrl"
                  value={formData.sourceUrl}
                  onChange={handleChange}
                  required
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://leetcode.com/problems/two-sum/"
                />
                <button
                  type="button"
                  onClick={extractFromUrl}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Extract Info
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Paste the URL from LeetCode, HackerRank, etc.
              </p>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Problem Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                maxLength={200}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Two Sum, Valid Parentheses"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                maxLength={1000}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the problem (optional)"
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.description.length}/1000 characters
              </p>
            </div>

            {/* Platform, Difficulty, Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {platforms.map(platform => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty *
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="array, two-pointers, hash-map (comma separated)"
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter tags separated by commas
              </p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="text-red-700">{error}</div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding Question...' : 'Add Question'}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/group/${groupId}`)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">💡 Tips:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Paste the problem URL first and click "Extract Info" to auto-fill some fields</li>
            <li>• Choose the appropriate difficulty and category to help others find similar problems</li>
            <li>• Add relevant tags to make the problem searchable</li>
            <li>• The description is optional but can help provide context</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;