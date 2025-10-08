import React from 'react';
import { Card } from '@/components/ui/card';
import { Building2, MapPin, Users } from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface ProfileSelectorProps {
  onSelectProfile: (profileId: string) => void;
}

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onSelectProfile }) => {
  const profiles: Profile[] = [
    {
      id: 'geral',
      name: 'Geral',
      description: 'Visão consolidada de todas as operações',
      icon: <Building2 className="w-16 h-16" />,
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'filial-sul',
      name: 'Filial Sul',
      description: 'Operações específicas da filial sul',
      icon: <MapPin className="w-16 h-16" />,
      color: 'from-orange-500 to-orange-700'
    }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center z-50">
      <div className="w-full max-w-5xl px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <Building2 className="h-12 w-12 text-white" />
            <div className="text-left">
              <h1 className="text-4xl font-bold text-white">CAIXA Empresas</h1>
              <p className="text-blue-200 text-sm">Gerenciador Financeiro PJ</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Quem está acessando?</h2>
          <p className="text-blue-200 text-lg">Selecione o perfil para continuar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {profiles.map((profile) => (
            <Card
              key={profile.id}
              onClick={() => onSelectProfile(profile.id)}
              className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-white"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${profile.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative p-8 flex flex-col items-center text-center text-white">
                <div className="mb-4 p-4 bg-white/20 rounded-full group-hover:bg-white/30 transition-all">
                  {profile.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{profile.name}</h3>
                <p className="text-white/90 text-sm">{profile.description}</p>
                
                <div className="mt-6 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Acessar</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-blue-200 text-sm">
            João Silva • Empresa Exemplo Ltda
          </p>
        </div>
      </div>
    </div>
  );
};
