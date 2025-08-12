'use client';

import { useEffect, useCallback } from 'react';

interface KeyboardNavigationProps {
  onSearchFocus?: () => void;
  onClearFilters?: () => void;
  onToggleView?: () => void;
  onNextPage?: () => void;
  onPrevPage?: () => void;
}

const KeyboardNavigation = ({
  onSearchFocus,
  onClearFilters,
  onToggleView,
  onNextPage,
  onPrevPage
}: KeyboardNavigationProps) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't trigger shortcuts when user is typing in an input field
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLSelectElement
    ) {
      return;
    }

    // Handle keyboard shortcuts
    switch (event.key.toLowerCase()) {
      case '/':
        // Focus search (like GitHub)
        event.preventDefault();
        onSearchFocus?.();
        break;
      
      case 'c':
        // Clear filters
        if (event.altKey) {
          event.preventDefault();
          onClearFilters?.();
        }
        break;
      
      case 'v':
        // Toggle view
        if (event.altKey) {
          event.preventDefault();
          onToggleView?.();
        }
        break;
      
      case 'arrowright':
        // Next page
        if (event.altKey) {
          event.preventDefault();
          onNextPage?.();
        }
        break;
      
      case 'arrowleft':
        // Previous page
        if (event.altKey) {
          event.preventDefault();
          onPrevPage?.();
        }
        break;
      
      case 't':
        // Back to top
        if (event.altKey) {
          event.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
        break;
      
      case '?':
        // Show keyboard shortcuts help
        event.preventDefault();
        showKeyboardHelp();
        break;
    }
  }, [onSearchFocus, onClearFilters, onToggleView, onNextPage, onPrevPage]);

  const showKeyboardHelp = () => {
    const helpText = `
Keyboard Shortcuts:
• / - Focus search
• Alt + C - Clear all filters
• Alt + V - Toggle grid/list view
• Alt + T - Back to top
• Alt + ← - Previous page
• Alt + → - Next page
• ? - Show this help
• Esc - Close modals/dialogs
    `.trim();

    alert(helpText);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return null; // This component doesn't render anything
};

export default KeyboardNavigation;