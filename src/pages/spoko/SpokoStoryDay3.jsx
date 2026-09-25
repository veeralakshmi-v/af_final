import React from 'react';
import SpokoStoryDay from './SpokoStoryDay';

export default function SpokoStoryDay3({ activeTab, onNavigate, session }) {
  return <SpokoStoryDay day={3} activeTab={activeTab} onNavigate={onNavigate} session={session} />;
}
