'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { FaLinkedin, FaUser, FaBuilding, FaMapMarkerAlt, FaBriefcase, FaPlus } from 'react-icons/fa';

export default function ContentPersonalizationPage() {
  const [message, setMessage] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  const variables = [
    { key: 'firstname', label: 'First Name', icon: FaUser, example: 'John' },
    { key: 'company', label: 'Company', icon: FaBuilding, example: 'TechCorp' },
    { key: 'position', label: 'Position', icon: FaBriefcase, example: 'Senior Developer' },
    { key: 'location', label: 'Location', icon: FaMapMarkerAlt, example: 'San Francisco' }
  ];

  const insertVariable = (variableKey: string) => {
    const variableText = `{{${variableKey}}}`;
    const newMessage = message.slice(0, cursorPosition) + variableText + message.slice(cursorPosition);
    setMessage(newMessage);
    setCursorPosition(cursorPosition + variableText.length);
    
    // Focus back to textarea
    setTimeout(() => {
      const textarea = document.getElementById('message-textarea') as HTMLTextAreaElement;
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(cursorPosition + variableText.length, cursorPosition + variableText.length);
      }
    }, 0);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setCursorPosition(e.target.selectionStart);
  };

  const handleTextareaSelect = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCursorPosition(e.target.selectionStart);
  };

  // Generate preview by replacing variables
  const generatePreview = () => {
    let preview = message;
    variables.forEach(variable => {
      const regex = new RegExp(`{{${variable.key}}}`, 'g');
      preview = preview.replace(regex, variable.example);
    });
    return preview || 'Your message preview will appear here...';
  };

  const characterCount = message.length;
  const maxChars = 300;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaLinkedin className="w-5 h-5 text-blue-600" />
        </div>
        <h1 className="text-2xl font-medium text-gray-900 mb-2">Content & Personalization</h1>
        <p className="text-gray-600">Craft your connection request message</p>
      </div>

      {/* Info Banner */}
      <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-2xl">
        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-white text-xs font-bold">i</span>
        </div>
        <p className="text-sm text-blue-700">
          Keep your messages concise and on-point for better performance. Personalized messages get 3x more responses.
        </p>
      </div>

      {/* Message Editor */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Connection Request Message
          </label>
          <div className="relative">
            <textarea
              id="message-textarea"
              value={message}
              onChange={handleTextareaChange}
              onSelect={handleTextareaSelect}
              className="w-full h-32 p-4 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Hi {{firstname}}, I'd love to connect with you..."
              maxLength={maxChars}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-500">
              {characterCount}/{maxChars}
            </div>
          </div>
          {characterCount > maxChars * 0.9 && (
            <p className="text-sm text-orange-600 mt-1">
              Consider shortening your message for better engagement
            </p>
          )}
        </div>

        {/* Variable Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Insert Variables
          </label>
          <div className="flex flex-wrap gap-2">
            {variables.map((variable) => {
              const Icon = variable.icon;
              return (
                <button
                  key={variable.key}
                  onClick={() => insertVariable(variable.key)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 rounded-full text-sm transition-colors border border-gray-200 hover:border-blue-200"
                >
                  <Icon className="w-3 h-3" />
                  <span>{variable.label}</span>
                  <FaPlus className="w-2 h-2" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Message Preview */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Message Preview
        </label>
        <div className="bg-gray-50 rounded-2xl p-4 min-h-[100px]">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              You
            </div>
            <div className="flex-1">
              <div className="bg-white rounded-2xl p-3 shadow-sm">
                <p className="text-sm text-gray-900 whitespace-pre-wrap">
                  {generatePreview()}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">LinkedIn connection request</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Templates */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Quick Templates
        </label>
        <div className="grid grid-cols-1 gap-2">
          {[
            "Hi {{firstname}}, I'd love to connect and learn about your work at {{company}}.",
            "Hello {{firstname}}, I noticed we both work in similar roles. Would love to connect!",
            "Hi {{firstname}}, your experience at {{company}} caught my attention. Let's connect!"
          ].map((template, index) => (
            <button
              key={index}
              onClick={() => setMessage(template)}
              className="text-left p-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-blue-200 transition-colors"
            >
              <p className="text-sm text-gray-700">{template}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" className="px-6 py-3 rounded-2xl">
          Back
        </Button>
        <div className="flex space-x-3">
          <Button variant="outline" className="px-6 py-3 rounded-2xl">
            Save
          </Button>
          <Button 
            variant="primary" 
            className="px-6 py-3 rounded-2xl"
            disabled={!message.trim()}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}