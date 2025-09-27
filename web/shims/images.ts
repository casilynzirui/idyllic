// Image shims for web - placeholder images
const createPlaceholderImage = (name: string, color: string = '#ccc') => {
  // Create a data URL for a simple colored rectangle with text
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 100, 100);
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(name, 50, 50);
  }
  return canvas.toDataURL();
};

// Export placeholder images - including all assets from the app
export const images = {
  // Mood images
  'kitty_imiley.png': createPlaceholderImage('Kitty', '#ff69b4'),
  'stun_imiley.png': createPlaceholderImage('Stun', '#90ee90'),
  'sad_imiley.png': createPlaceholderImage('Sad', '#87ceeb'),
  'sleepy_imiley.png': createPlaceholderImage('Sleepy', '#dda0dd'),
  'smirk_imiley.png': createPlaceholderImage('Smirk', '#ffff00'),
  'eyebrow_imiley.png': createPlaceholderImage('Eyebrow', '#ffa500'),
  'happy_imiley.png': createPlaceholderImage('Happy', '#98fb98'),
  'angry_imiley.png': createPlaceholderImage('Angry', '#ff4444'),
  'imiley_loading.png': createPlaceholderImage('Loading', '#d3d3d3'),
  
  // Navigation icons
  'note_active.png': createPlaceholderImage('Note+', '#4CAF50'),
  'note_inactive.png': createPlaceholderImage('Note', '#999'),
  'matrix_active.png': createPlaceholderImage('Matrix+', '#4CAF50'),
  'matrix_inactive.png': createPlaceholderImage('Matrix', '#999'),
  'dashboard_active.png': createPlaceholderImage('Dash+', '#4CAF50'),
  'dashboard_inactive.png': createPlaceholderImage('Dash', '#999'),
  'pomodoro_active.png': createPlaceholderImage('Pomo+', '#4CAF50'),
  'pomodoro_inactive.png': createPlaceholderImage('Pomo', '#999'),
  'more_active.png': createPlaceholderImage('More+', '#4CAF50'),
  'more_inactive.png': createPlaceholderImage('More', '#999'),
  
  // Action buttons
  'back.png': createPlaceholderImage('Back', '#696969'),
  'addtask.png': createPlaceholderImage('Add', '#32cd32'),
  'edit.png': createPlaceholderImage('Edit', '#2196F3'),
  'delete.png': createPlaceholderImage('Del', '#f44336'),
  'bin.png': createPlaceholderImage('Bin', '#f44336'),
  'tick.png': createPlaceholderImage('✓', '#4CAF50'),
  'setting.png': createPlaceholderImage('Set', '#757575'),
  'info.png': createPlaceholderImage('Info', '#2196F3'),
  'link.png': createPlaceholderImage('Link', '#2196F3'),
  'feedback.png': createPlaceholderImage('Feed', '#FF9800'),
  'theme.png': createPlaceholderImage('Theme', '#9C27B0'),
  'sound.png': createPlaceholderImage('Sound', '#607D8B'),
  
  // Matrix quadrant icons
  'doit.png': createPlaceholderImage('Do', '#4CAF50'),
  'decideit.png': createPlaceholderImage('Decide', '#FF9800'),
  'delegateit.png': createPlaceholderImage('Delegate', '#2196F3'),
  'deleteit.png': createPlaceholderImage('Delete', '#f44336'),
  
  // Timer icons
  'playbutton.png': createPlaceholderImage('▶', '#4CAF50'),
  'stopbutton.png': createPlaceholderImage('⏹', '#f44336'),
  'resetbutton.png': createPlaceholderImage('⟲', '#FF9800'),
  
  // Task management
  'completedtask.png': createPlaceholderImage('Done', '#4CAF50'),
  'datetime.png': createPlaceholderImage('Time', '#607D8B'),
  'back_ascent.png': createPlaceholderImage('Back↗', '#696969'),
};

// Create a require-like function for images
export const requireImage = (path: string) => {
  const filename = path.split('/').pop() || '';
  return { uri: images[filename as keyof typeof images] || createPlaceholderImage('Missing') };
};

export default images;
