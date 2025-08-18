import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationCircle } from "react-icons/fa";
import React from "react";
const Notification = ({ type = "info", message, onClose }) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const notificationStyles = {
        success: {
            bg: "bg-green-100",
            text: "text-green-800",
            icon: <FaCheckCircle className="text-green-500" />,
        },
        error: {
            bg: "bg-red-100",
            text: "text-red-800",
            icon: <FaTimesCircle className="text-red-500" />,
        },
        info: {
            bg: "bg-blue-100",
            text: "text-blue-800",
            icon: <FaInfoCircle className="text-blue-500" />,
        },
        warning: {
            bg: "bg-yellow-100",
            text: "text-yellow-800",
            icon: <FaExclamationCircle className="text-yellow-500" />,
        },
    };

    const currentStyle = notificationStyles[type] || notificationStyles.info;

    const handleClose = () => {
        setVisible(false);
        if (onClose) onClose();
    };

    return (
        <div
            className={`flex items-center p-4 mb-4 rounded shadow-lg ${currentStyle.bg} ${currentStyle.text}`}
        >
            <div className="mr-3">{currentStyle.icon}</div>
            <span className="flex-1">{message}</span>
            <button
                onClick={handleClose}
                className="ml-4 text-lg focus:outline-none hover:text-gray-600"
            >
                ✕
            </button>
        </div>
    );
};

// Add PropTypes for validation
Notification.propTypes = {
    type: PropTypes.oneOf(["success", "error", "info", "warning"]),
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func,
};

// Set default props
Notification.defaultProps = {
    type: "info",
    onClose: () => {},
};

export default Notification;