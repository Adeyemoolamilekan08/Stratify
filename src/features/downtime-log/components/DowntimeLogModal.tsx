import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@utils/cn';
import { useCreateDowntimeLog, useUpdateDowntimeLog } from '../hooks/useDowntimeLogs';
import { DOWNTIME_REASONS, REASON_CATEGORIES } from '../types/downtime-log.types';

interface DowntimeLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingLog?: any;
}

const downtimeSchema = z.object({
  machineId: z.string().min(1, 'Machine is required'),
  startTime: z.date({ required_error: 'Start time is required' }),
  endTime: z.date().optional(),
  reasonCode: z.string().min(1, 'Reason is required'),
  operator: z.string().min(1, 'Operator name is required'),
  shift: z.enum(['A', 'B', 'C']),
  remarks: z.string().optional(),
}).refine((data) => {
  if (data.endTime && data.startTime) {
    return data.endTime > data.startTime;
  }
  return true;
}, {
  message: 'End time must be after start time',
  path: ['endTime'],
});

type DowntimeFormData = z.infer<typeof downtimeSchema>;

// Mock machines - replace with real data from API
const machines = [
  { id: '1', name: 'LI-43-OM-910' },
  { id: '2', name: 'LI-44-OM-920' },
  { id: '3', name: 'LI-45-OM-930' },
];

export const DowntimeLogModal = ({ isOpen, onClose, editingLog }: DowntimeLogModalProps) => {
  const [selectedReason, setSelectedReason] = useState('');
  const createMutation = useCreateDowntimeLog();
  const updateMutation = useUpdateDowntimeLog();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DowntimeFormData>({
    resolver: zodResolver(downtimeSchema),
    defaultValues: {
      machineId: '',
      startTime: new Date(),
      endTime: undefined,
      reasonCode: '',
      operator: '',
      shift: 'A',
      remarks: '',
    },
  });

  const startTime = watch('startTime');
  const endTime = watch('endTime');
  const reasonCode = watch('reasonCode');

  // Calculate duration
  const getDuration = () => {
    if (startTime && endTime) {
      const diff = endTime.getTime() - startTime.getTime();
      const minutes = Math.floor(diff / 60000);
      if (minutes > 0) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
      }
      return '0m';
    }
    return 'Not resolved';
  };

  // Get reason details
  const getReasonDetails = () => {
    const reason = DOWNTIME_REASONS.find(r => r.code === reasonCode);
    if (reason) {
      const category = REASON_CATEGORIES[reason.category as keyof typeof REASON_CATEGORIES];
      return { reason, category };
    }
    return null;
  };

  const reasonDetails = getReasonDetails();

  useEffect(() => {
    if (editingLog) {
      reset({
        machineId: editingLog.machineId,
        startTime: new Date(editingLog.startTime),
        endTime: editingLog.endTime ? new Date(editingLog.endTime) : undefined,
        reasonCode: editingLog.reasonCode,
        operator: editingLog.operator,
        shift: editingLog.shift,
        remarks: editingLog.remarks || '',
      });
      setSelectedReason(editingLog.reasonCode);
    } else {
      reset({
        machineId: '',
        startTime: new Date(),
        endTime: undefined,
        reasonCode: '',
        operator: '',
        shift: 'A',
        remarks: '',
      });
      setSelectedReason('');
    }
  }, [editingLog, reset]);

  const onSubmit = async (data: DowntimeFormData) => {
    try {
      const reason = DOWNTIME_REASONS.find(r => r.code === data.reasonCode);
      const payload = {
        ...data,
        reason: reason?.name || '',
        reasonCategory: reason?.category || 'other',
      };

      if (editingLog) {
        await updateMutation.mutateAsync({ id: editingLog.id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      onClose();
      reset();
    } catch (error) {
      // Error handled by mutation
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingLog ? 'Edit Downtime Log' : 'Add Downtime Log'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Machine */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Machine <span className="text-red-500">*</span>
              </label>
              <select
                {...register('machineId')}
                className={cn(
                  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none',
                  errors.machineId ? 'border-red-500' : 'border-gray-300'
                )}
              >
                <option value="">Select Machine</option>
                {machines.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.name}
                  </option>
                ))}
              </select>
              {errors.machineId && (
                <p className="mt-1 text-sm text-red-600">{errors.machineId.message}</p>
              )}
            </div>

            {/* Operator */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Operator <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('operator')}
                className={cn(
                  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none',
                  errors.operator ? 'border-red-500' : 'border-gray-300'
                )}
                placeholder="Enter operator name"
              />
              {errors.operator && (
                <p className="mt-1 text-sm text-red-600">{errors.operator.message}</p>
              )}
            </div>

            {/* Shift */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shift <span className="text-red-500">*</span>
              </label>
              <select
                {...register('shift')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="A">Shift A</option>
                <option value="B">Shift B</option>
                <option value="C">Shift C</option>
              </select>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason <span className="text-red-500">*</span>
              </label>
              <select
                {...register('reasonCode')}
                onChange={(e) => setSelectedReason(e.target.value)}
                className={cn(
                  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none',
                  errors.reasonCode ? 'border-red-500' : 'border-gray-300'
                )}
              >
                <option value="">Select Reason</option>
                {DOWNTIME_REASONS.map((reason) => (
                  <option key={reason.code} value={reason.code}>
                    {reason.name} ({reason.category})
                  </option>
                ))}
              </select>
              {errors.reasonCode && (
                <p className="mt-1 text-sm text-red-600">{errors.reasonCode.message}</p>
              )}
            </div>
          </div>

          {/* Time Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                {...register('startTime', { valueAsDate: true })}
                className={cn(
                  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none',
                  errors.startTime ? 'border-red-500' : 'border-gray-300'
                )}
              />
              {errors.startTime && (
                <p className="mt-1 text-sm text-red-600">{errors.startTime.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="datetime-local"
                {...register('endTime', { valueAsDate: true })}
                className={cn(
                  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none',
                  errors.endTime ? 'border-red-500' : 'border-gray-300'
                )}
              />
              {errors.endTime && (
                <p className="mt-1 text-sm text-red-600">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          {/* Duration Display */}
          <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
            <span className="text-sm text-gray-600">Duration:</span>
            <span className="text-sm font-semibold text-gray-900">{getDuration()}</span>
          </div>

          {/* Reason Category Display */}
          {reasonDetails && (
            <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Category:</span>
              <span className={cn(
                "px-2 py-1 text-xs font-medium rounded-full",
                reasonDetails.category.color
              )}>
                {reasonDetails.category.label}
              </span>
            </div>
          )}

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <textarea
              {...register('remarks')}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              placeholder="Optional remarks..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : editingLog ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};