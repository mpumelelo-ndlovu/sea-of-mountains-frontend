// src/components/InputField.jsx
import React from 'react';

const InputField = ({ label, type = 'text', name, id, placeholder, required = false, value, onChange, fullWidth = false, as = 'input', rows = 3, children, accept, readOnly = false, disabled = false, pattern, title, step, error }) => {
    const commonProps = {
        name,
        id,
        placeholder,
        required,
        readOnly,
        disabled,
        pattern,
        title,
        step,
        className: `mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-ocean-blue focus:border-ocean-blue sm:text-sm transition-colors duration-300 ease-in-out file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-mountain-tan file:text-white hover:file:bg-mountain-tan/80 ${readOnly || disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${error ? 'border-red-500' : 'border-gray-300'}`,
    };

    const renderInput = () => {
        switch (as) {
            case 'textarea':
                return <textarea rows={rows} {...commonProps} value={value} onChange={onChange}></textarea>;
            case 'select':
                return <select {...commonProps} value={value} onChange={onChange}>{children}</select>;
            case 'file':
                 return <input type="file" {...commonProps} onChange={onChange} accept={accept} />;
            default:
                return <input type={type} {...commonProps} value={value} onChange={onChange} />;
        }
    };

    return (
        <div className={fullWidth ? 'md:col-span-2' : ''}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {renderInput()}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default InputField;