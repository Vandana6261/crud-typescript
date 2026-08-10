// src/components/UserMenu.tsx
import React from 'react';
import { X } from 'lucide-react';

export interface UserInfo {
  username: string;
  role: string;
  email?: string;
}

interface UserMenuProps {
  user: UserInfo;
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-56 bg-page dark:bg-gray-800 rounded-md shadow-lg p-4 z-20 border border-cardBorder">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-title">{user.username}</h3>
        <button onClick={onClose} aria-label="Close" className="text-muted hover:text-primary">
          <X size={18} className="stroke-current" />
        </button>
      </div>
      <p className="text-sm text-muted">Role: {user.role}</p>
    </div>
  );
};

export default UserMenu;
