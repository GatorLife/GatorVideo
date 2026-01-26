// UI State Manager - orchestrates screen visibility and input field overlays
import React from 'react';
import { ScreenTransition } from './ScreenTransition';
import { InputFieldSimulator } from './InputFieldSimulator';
import { ScreenState, UIState, InputFieldConfig, CursorState } from '../../scenes/Scene4/types';

interface UIStateManagerProps {
  uiState: UIState;
  cursorState: CursorState;
  screenStates: ScreenState[];
  inputFields: InputFieldConfig[];
  showAnnotations?: boolean;
}

export const UIStateManager: React.FC<UIStateManagerProps> = ({
  uiState,
  cursorState,
  screenStates,
  inputFields,
  showAnnotations = true,
}) => {
  const { activeInputId, currentText, isTyping } = cursorState;

  // Track accumulated text for each input field
  // (In a more complex scenario, you'd track state per field)
  const getFieldText = (fieldId: string): string => {
    if (fieldId === activeInputId) {
      return currentText;
    }
    // Return previously typed text if this field was typed in earlier
    // For now, we only support one active field at a time
    return '';
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Screen states with transitions */}
      <ScreenTransition
        uiState={uiState}
        screenStates={screenStates}
        showAnnotations={showAnnotations}
      />

      {/* Input field overlays */}
      {inputFields.map(field => {
        const isFieldActive = field.id === activeInputId;
        const fieldText = getFieldText(field.id);

        // Only show input field overlay when it's active or has text
        if (!isFieldActive && !fieldText) {
          return null;
        }

        // Calculate cursor visibility
        const cursorVisible = isTyping && isFieldActive;

        return (
          <InputFieldSimulator
            key={field.id}
            config={field}
            displayText={fieldText}
            isActive={isFieldActive}
            cursorVisible={cursorVisible}
          />
        );
      })}
    </div>
  );
};
