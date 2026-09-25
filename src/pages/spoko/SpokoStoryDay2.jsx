import React from 'react';
import SpokoStoryDay from './SpokoStoryDay';

export default function SpokoStoryDay2({ activeTab, onNavigate, session }) {
  return <SpokoStoryDay day={2} activeTab={activeTab} onNavigate={onNavigate} session={session} />;
}
