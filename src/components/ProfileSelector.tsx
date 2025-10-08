import React from 'react';
import { Card } from '@/components/ui/card';
import { Building2, MapPin, PlusCircle } from 'lucide-react';

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
    },
    {
      id: 'novo-perfil',
      name: 'Novo perfil',
      description: 'Criar um novo perfil personalizado',
      icon: <PlusCircle className="w-16 h-16" />,
      color: 'from-green-600 to-green-800'
    }
  ];

  const handleProfileClick = (profileId: string) => {
    if (profileId === 'novo-perfil') {
      // Simular criação de novo perfil
      alert('Funcionalidade de criação de novo perfil.\n\nEm produção, isso abriria um formulário para configurar um novo perfil com nome, descrição e permissões personalizadas.');
      return;
    }
    onSelectProfile(profileId);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Selecionar perfil</h2>
          <p className="text-gray-600 text-lg">Escolha o perfil para continuar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <Card
              key={profile.id}
              onClick={() => handleProfileClick(profile.id)}
              className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-blue-500"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${profile.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative p-8 flex flex-col items-center text-center text-white min-h-[250px] justify-center">
                <div className="mb-4 p-4 bg-white/20 rounded-full group-hover:bg-white/30 transition-all">
                  {profile.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{profile.name}</h3>
                <p className="text-white/90 text-sm">{profile.description}</p>
                
                <div className="mt-6 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{profile.id === 'novo-perfil' ? 'Criar' : 'Acessar'}</span>
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
      </div>
    </div>
  );
};
