import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FAB: React.FC = () => {
  const handleClick = () => {
    window.open('https://gid.caixa:9443/ccm/web/projects/Box%20Relacionamento%20Digital#action=com.ibm.team.dashboard.viewDashboard', '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 h-14 px-6 bg-blue-900 hover:bg-blue-800 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center gap-2 rounded-full"
    >
      <Globe className="h-5 w-5" />
      <span className="font-medium">Status Jornada</span>
    </Button>
  );
};
