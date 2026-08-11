// src/features/master-data/components/MasterFormDialog.tsx

import React, { useState, useEffect } from 'react';
import { cn } from '@utils/cn';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'date';
  options?: { value: string; label: string }[];
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

interface MasterFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  title: string;
  fields: FormField[];
  initialData?: any;
  isLoading?: boolean;
}

export const MasterFormDialog: React.FC<MasterFormDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  fields,
  initialData = {},
  isLoading = false,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.minLength && formData[field.name]?.length < field.minLength) {
        newErrors[field.name] = `${field.label} must be at least ${field.minLength} characters`;
      }
      if (field.maxLength && formData[field.name]?.length > field.maxLength) {
        newErrors[field.name] = `${field.label} must be less than ${field.maxLength} characters`;
      }
      if (field.min !== undefined && Number(formData[field.name]) < field.min) {
        newErrors[field.name] = `${field.label} must be at least ${field.min}`;
      }
      if (field.max !== undefined && Number(formData[field.name]) > field.max) {
        newErrors[field.name] = `${field.label} must be less than ${field.max}`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />
      
      {/* Dialog */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[500px] max-w-[90vw] bg-white rounded-[8px] shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB] flex-shrink-0">
          <h3 className="text-[15px] font-semibold text-[#1F2937]">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F6] rounded transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-[12px] font-medium text-[#6B7280] mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {field.type === 'select' ? (
                  <select
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className={cn(
                      "w-full px-3 py-2 border rounded-[4px] text-[13px] focus:outline-none focus:border-[#33479A]",
                      errors[field.name] ? "border-red-500" : "border-[#E5E7EB]"
                    )}
                  >
                    <option value="">Select...</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    rows={3}
                    className={cn(
                      "w-full px-3 py-2 border rounded-[4px] text-[13px] focus:outline-none focus:border-[#33479A]",
                      errors[field.name] ? "border-red-500" : "border-[#E5E7EB]"
                    )}
                  />
                ) : (
                  <input
                    type={field.type === 'number' ? 'number' : 'text'}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className={cn(
                      "w-full px-3 py-2 border rounded-[4px] text-[13px] focus:outline-none focus:border-[#33479A]",
                      errors[field.name] ? "border-red-500" : "border-[#E5E7EB]"
                    )}
                  />
                )}
                {errors[field.name] && (
                  <p className="text-[11px] text-red-500 mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 p-4 border-t border-[#E5E7EB] flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[12px] font-medium text-[#6B7280] hover:bg-[#F3F4F6] rounded-[4px] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-[12px] font-medium text-white bg-[#33479A] hover:bg-[#2A3D82] rounded-[4px] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};