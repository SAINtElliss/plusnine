import React, { useState, useEffect, useRef } from 'react';
import { Lock, X, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import { RoadmapItem } from './FestivalRoadmap';

interface AdminPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (items: RoadmapItem[], key: string) => void;
}

export const AdminPreviewModal: React.FC<AdminPreviewModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [passkey, setPasskey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPasskey('');
      setErrorMsg('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = passkey.trim();
    if (!cleanKey) {
      setErrorMsg('Please enter your curator key');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch(`/api/roadmap?key=${encodeURIComponent(cleanKey)}`, {
        headers: {
          'x-admin-key': cleanKey,
          'authorization': `Bearer ${cleanKey}`
        }
      });

      if (!res.ok) {
        throw new Error('Authentication failed');
      }

      const data = await res.json();
      if ((data.isAdminPreview || data.released) && Array.isArray(data.items) && data.items.length > 0) {
        onSuccess(data.items, cleanKey);
        onClose();
      } else {
        setErrorMsg('Invalid curator key. Please check your passkey and try again.');
      }
    } catch {
      setErrorMsg('Unable to verify passkey. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="admin-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Curator Preview Login"
    >
      <div className="admin-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <div className="admin-modal-title-group">
            <KeyRound size={16} className="admin-modal-icon" aria-hidden="true" />
            <h3 className="admin-modal-title">CURATOR ACCESS</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="admin-modal-close-btn"
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>

        <p className="admin-modal-desc">
          Enter the festival curator passkey to unlock the complete unreleased roadmap timetable in private preview mode.
        </p>

        <form onSubmit={handleSubmit} className="admin-modal-form">
          <div className="admin-modal-input-wrap">
            <Lock size={14} className="admin-modal-input-icon" aria-hidden="true" />
            <input
              ref={inputRef}
              type="password"
              value={passkey}
              onChange={(e) => {
                setPasskey(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Enter curator passkey..."
              className="admin-modal-input"
              autoComplete="current-password"
            />
          </div>

          {errorMsg && (
            <div className="admin-modal-error" role="alert">
              {errorMsg}
            </div>
          )}

          <div className="admin-modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="admin-modal-btn admin-modal-btn--cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !passkey.trim()}
              className="admin-modal-btn admin-modal-btn--submit"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="admin-modal-spinner" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Unlock Preview</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPreviewModal;
