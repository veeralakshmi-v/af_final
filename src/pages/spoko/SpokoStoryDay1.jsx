import React from 'react';
import SpokoStoryDay from './SpokoStoryDay';

export default function SpokoStoryDay1({ activeTab, onNavigate, session }) {
  return <SpokoStoryDay day={1} activeTab={activeTab} onNavigate={onNavigate} session={session} />;
}
