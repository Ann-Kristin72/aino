"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
import Image from 'next/image';
import { getAdmins } from "@/lib/api/admins";
import AdminCard from "@/components/AdminCard";
import PrimaryButton from "@/components/PrimaryButton";
import Spinner from "@/components/Spinner";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Admin {
  id: string;
  name: string;
  email: string;
}

export default function AccessPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'hovedredaktør'
  });

  // Get user data from sessionStorage
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('userData');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUserData(parsed);
      }
    } catch (error) {
      console.error('Error parsing userData:', error);
    }
  }, []);

  // Fetch admins
  const { data: admins = [], isLoading } = useQuery({
    queryKey: ['admins'],
    queryFn: getAdmins,
  });

  // Filter admins based on search term
  const filteredAdmins = admins.filter((admin: Admin) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    router.push('/');
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement add admin functionality
    console.log('Adding admin:', newAdmin);
    setShowAddForm(false);
    setNewAdmin({ name: '', email: '', role: 'hovedredaktør' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-latte flex items-center justify-center">
        <Spinner />
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-latte">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-warmbrown/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Image
                src="/design-guide/logo-kjede.png"
                alt="Kjede Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <h1 className="text-2xl font-slab font-semibold text-skifer">Tilgangsstyring</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {userData && (
                <div className="text-right">
                  <p className="text-sm text-warmbrown">{userData.name}</p>
                  <p className="text-xs text-warmbrown/70">{userData.role}</p>
                </div>
              )}
              <PrimaryButton 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logg ut
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Add Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Søk etter admin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-warmbrown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluegreen/50 focus:border-bluegreen"
              />
            </div>
            <PrimaryButton
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-bluegreen hover:bg-bluegreen/90 text-white px-6 py-2 rounded-lg"
            >
              {showAddForm ? 'Avbryt' : '+ Legg til ny admin'}
            </PrimaryButton>
          </div>
        </div>

        {/* Add Admin Form */}
        {showAddForm && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6 border border-warmbrown/20">
            <h3 className="text-xl font-slab text-skifer mb-4">Legg til ny admin</h3>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-warmbrown mb-1">
                    Navn
                  </label>
                  <input
                    type="text"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                    className="w-full px-3 py-2 border border-warmbrown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluegreen/50 focus:border-bluegreen"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warmbrown mb-1">
                    E-post
                  </label>
                  <input
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                    className="w-full px-3 py-2 border border-warmbrown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluegreen/50 focus:border-bluegreen"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-warmbrown mb-1">
                  Rolle
                </label>
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                  className="w-full px-3 py-2 border border-warmbrown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluegreen/50 focus:border-bluegreen"
                >
                  <option value="hovedredaktør">Hovedredaktør</option>
                  <option value="redaktør">Redaktør</option>
                  <option value="veileder">Veileder</option>
                  <option value="assistent">Assistent</option>
                </select>
              </div>
              <div className="flex gap-3">
                <PrimaryButton
                  type="submit"
                  className="bg-bluegreen hover:bg-bluegreen/90 text-white px-6 py-2 rounded-lg"
                >
                  Legg til
                </PrimaryButton>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 border border-warmbrown/30 rounded-lg text-warmbrown hover:bg-warmbrown/10"
                >
                  Avbryt
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Admin Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-slab text-skifer mb-6">
            Admins ({filteredAdmins.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAdmins.map((admin: Admin) => (
              <AdminCard key={admin.id} name={admin.name} email={admin.email} />
            ))}
          </div>
          {filteredAdmins.length === 0 && (
            <div className="text-center py-12">
              <p className="text-warmbrown text-lg">
                {searchTerm ? 'Ingen admins funnet for søket ditt.' : 'Ingen admins funnet.'}
              </p>
            </div>
          )}
        </div>

        {/* Access Management Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown/20">
          <h2 className="text-2xl font-slab text-skifer mb-4">📊 Tilgangsoversikt</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">{admins.length}</div>
              <div className="text-warmbrown">Aktive admins</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">24</div>
              <div className="text-warmbrown">Aktive kunder</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">5</div>
              <div className="text-warmbrown">Rolletyper</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">98%</div>
              <div className="text-warmbrown">Oppetid</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 