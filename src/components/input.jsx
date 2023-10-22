import React from 'react'

export default function Input({
    label,
    id,
    type = "text",
    value,
    onChange,
    hasWarning,
    ...reset
}) {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                {...reset}
            />
            {hasWarning &&
                <span className='warning-msg'>
                    {label} is requierd.
                </span>}
        </div>
    )
}
