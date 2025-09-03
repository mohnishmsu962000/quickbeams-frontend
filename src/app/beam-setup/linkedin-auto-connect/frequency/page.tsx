'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { FaLinkedin, FaCalendarAlt, FaClock, FaInfoCircle } from 'react-icons/fa';

type FrequencyType = 'repeatedly' | 'one-time' | 'custom';

interface DateRange {
  start: string;
  end: string;
}

export default function FrequencyPage() {
  const [frequencyType, setFrequencyType] = useState<FrequencyType>('repeatedly');
  const [messagesPerExecution, setMessagesPerExecution] = useState('20');
  const [dailyFrequency, setDailyFrequency] = useState('4');
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({ start: '', end: '' });
  const [useRange, setUseRange] = useState(false);

  const frequencyTabs = [
    { id: 'repeatedly', label: 'Repeatedly' },
    { id: 'one-time', label: 'One-time' },
    { id: 'custom', label: 'Custom' }
  ];

  const messagesPerExecutionOptions = [
    { value: '10', label: '10 messages' },
    { value: '15', label: '15 messages' },
    { value: '20', label: '20 messages' },
    { value: '25', label: '25 messages' },
    { value: '30', label: '30 messages' },
    { value: '50', label: '50 messages' }
  ];

  const dailyFrequencyOptions = [
    { value: '1', label: '1 time per day' },
    { value: '2', label: '2 times per day' },
    { value: '3', label: '3 times per day' },
    { value: '4', label: '4 times per day' },
    { value: '6', label: '6 times per day' }
  ];

  const handleDateSelection = (date: string) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter(d => d !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    return dates;
  };

  const dateOptions = generateDateOptions();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaLinkedin className="w-5 h-5 text-blue-600" />
        </div>
        <h1 className="text-2xl font-medium text-gray-900 mb-2">Frequency</h1>
        <p className="text-gray-600">Set when and how often to send connection requests</p>
      </div>

      {/* Frequency Type Tabs */}
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-3 min-w-max">
          {frequencyTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFrequencyType(tab.id as FrequencyType)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                frequencyType === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-2xl">
        <FaInfoCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Try to keep the daily sending limit within 50 for auto emails to avoid restrictions.
        </p>
      </div>

      {/* Configuration Content */}
      <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
        {frequencyType === 'repeatedly' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Per execution
              </label>
              <Select
                value={messagesPerExecution}
                onChange={setMessagesPerExecution}
                options={messagesPerExecutionOptions}
                className="rounded-2xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Daily
              </label>
              <Select
                value={dailyFrequency}
                onChange={setDailyFrequency}
                options={dailyFrequencyOptions}
                className="rounded-2xl"
              />
            </div>

            <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <FaClock className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Execution Summary</span>
              </div>
              <p className="text-sm text-green-700">
                Will send <strong>{messagesPerExecution} messages</strong> per execution, 
                <strong> {dailyFrequency} times daily</strong>
                {' '}= <strong>{parseInt(messagesPerExecution) * parseInt(dailyFrequency)} messages per day</strong>
              </p>
            </div>
          </>
        )}

        {frequencyType === 'one-time' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Total messages to send
              </label>
              <Select
                value={messagesPerExecution}
                onChange={setMessagesPerExecution}
                options={[
                  { value: '10', label: '10 messages' },
                  { value: '25', label: '25 messages' },
                  { value: '50', label: '50 messages' },
                  { value: '100', label: '100 messages' },
                  { value: '200', label: '200 messages' }
                ]}
                className="rounded-2xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Execution date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <FaCalendarAlt className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">One-time Execution</span>
              </div>
              <p className="text-sm text-blue-700">
                Will send <strong>{messagesPerExecution} messages</strong> on the selected date only
              </p>
            </div>
          </>
        )}

        {frequencyType === 'custom' && (
          <>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Date Selection Method
              </label>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setUseRange(false)}
                  className={`flex-1 p-3 rounded-2xl border-2 text-sm font-medium transition-all ${
                    !useRange
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  Individual Dates
                </button>
                <button
                  onClick={() => setUseRange(true)}
                  className={`flex-1 p-3 rounded-2xl border-2 text-sm font-medium transition-all ${
                    useRange
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  Date Range
                </button>
              </div>
            </div>

            {!useRange ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select specific dates
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {dateOptions.map((date) => (
                    <button
                      key={date.value}
                      onClick={() => handleDateSelection(date.value)}
                      className={`p-2 text-sm rounded-xl transition-all ${
                        selectedDates.includes(date.value)
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {date.label}
                    </button>
                  ))}
                </div>
                {selectedDates.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {selectedDates.length} date{selectedDates.length !== 1 ? 's' : ''} selected
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    min={dateRange.start || new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Messages per day
              </label>
              <Select
                value={messagesPerExecution}
                onChange={setMessagesPerExecution}
                options={[
                  { value: '5', label: '5 messages per day' },
                  { value: '10', label: '10 messages per day' },
                  { value: '15', label: '15 messages per day' },
                  { value: '20', label: '20 messages per day' },
                  { value: '25', label: '25 messages per day' }
                ]}
                className="rounded-2xl"
              />
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" className="px-6 py-3 rounded-2xl">
          Back
        </Button>
        <Button variant="primary" className="px-6 py-3 rounded-2xl">
          Continue
        </Button>
      </div>
    </div>
  );
}