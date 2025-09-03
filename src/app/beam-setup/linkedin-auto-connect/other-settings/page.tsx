'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { FaLinkedin, FaInfoCircle } from 'react-icons/fa';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default function OtherSettingsPage() {
  const [autoStop, setAutoStop] = useState('30');
  const [errorRatioOverride, setErrorRatioOverride] = useState('4');
  const [humanBehavior, setHumanBehavior] = useState(true);
  const [randomDelay, setRandomDelay] = useState(true);
  const [skipWeekends, setSkipWeekends] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [retryFailed, setRetryFailed] = useState(true);
  const [timeZone, setTimeZone] = useState('browser');

  const autoStopOptions = [
    { value: '7', label: 'after 7 days' },
    { value: '15', label: 'after 15 days' },
    { value: '30', label: 'after 30 days' },
    { value: '60', label: 'after 60 days' },
    { value: '90', label: 'after 90 days' },
    { value: 'never', label: 'never stop' }
  ];

  const errorRatioOptions = [
    { value: '2', label: '2 times per day' },
    { value: '3', label: '3 times per day' },
    { value: '4', label: '4 times per day' },
    { value: '5', label: '5 times per day' },
    { value: '10', label: '10 times per day' }
  ];

  const timeZoneOptions = [
    { value: 'browser', label: 'Browser timezone' },
    { value: 'pst', label: 'Pacific (PST)' },
    { value: 'est', label: 'Eastern (EST)' },
    { value: 'cst', label: 'Central (CST)' },
    { value: 'utc', label: 'UTC' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaLinkedin className="w-5 h-5 text-blue-600" />
        </div>
        <h1 className="text-2xl font-medium text-gray-900 mb-2">Other Settings</h1>
        <p className="text-gray-600">Configure advanced automation settings</p>
      </div>

      <div className="space-y-8">
        {/* Auto-stop */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <label className="text-sm font-medium text-gray-700">Auto-stop</label>
            <Tooltip text="Automatically stop the beam after a specified period to prevent over-automation">
              <FaInfoCircle className="w-3 h-3 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
          <Select
            value={autoStop}
            onChange={setAutoStop}
            options={autoStopOptions}
            className="rounded-2xl"
          />
        </div>

        {/* Error ratio override */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <label className="text-sm font-medium text-gray-700">Error ratio override</label>
            <Tooltip text="Maximum allowed connection errors per day before pausing the automation">
              <FaInfoCircle className="w-3 h-3 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
          <Select
            value={errorRatioOverride}
            onChange={setErrorRatioOverride}
            options={errorRatioOptions}
            className="rounded-2xl"
          />
        </div>

        {/* Time Zone */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <label className="text-sm font-medium text-gray-700">Time zone</label>
            <Tooltip text="Choose the timezone for scheduling your automation execution">
              <FaInfoCircle className="w-3 h-3 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
          <Select
            value={timeZone}
            onChange={setTimeZone}
            options={timeZoneOptions}
            className="rounded-2xl"
          />
        </div>

        {/* Toggle Settings */}
        <div className="space-y-4">
          {/* Human-like behavior */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Human-like behavior</span>
              <Tooltip text="Add natural delays and patterns to mimic human browsing behavior">
                <FaInfoCircle className="w-3 h-3 text-gray-400 cursor-help" />
              </Tooltip>
            </div>
            <button
              onClick={() => setHumanBehavior(!humanBehavior)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                humanBehavior ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  humanBehavior ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Random delays */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Random delays</span>
              <Tooltip text="Add random delays between actions to avoid detection">
                <FaInfoCircle className="w-3 h-3 text-gray-400 cursor-help" />
              </Tooltip>
            </div>
            <button
              onClick={() => setRandomDelay(!randomDelay)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                randomDelay ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  randomDelay ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Skip weekends */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Skip weekends</span>
              <Tooltip text="Pause automation during weekends for better engagement rates">
                <FaInfoCircle className="w-3 h-3 text-gray-400 cursor-help" />
              </Tooltip>
            </div>
            <button
              onClick={() => setSkipWeekends(!skipWeekends)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                skipWeekends ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  skipWeekends ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Email notifications */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Email notifications</span>
              <Tooltip text="Receive email updates about your beam's performance and issues">
                <FaInfoCircle className="w-3 h-3 text-gray-400 cursor-help" />
              </Tooltip>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Retry failed connections */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Retry failed connections</span>
              <Tooltip text="Automatically retry sending connection requests that failed">
                <FaInfoCircle className="w-3 h-3 text-gray-400 cursor-help" />
              </Tooltip>
            </div>
            <button
              onClick={() => setRetryFailed(!retryFailed)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                retryFailed ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  retryFailed ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" className="px-6 py-3 rounded-2xl">
          Back
        </Button>
        <div className="flex space-x-3">
          <Button variant="outline" className="px-6 py-3 rounded-2xl">
            Save as draft
          </Button>
          <Button variant="primary" className="px-6 py-3 rounded-2xl">
            Publish Beam
          </Button>
        </div>
      </div>
    </div>
  );
}