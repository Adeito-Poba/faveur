'use client';

import { useAuth } from '@/lib/auth-context';
import { logoutUser } from '@/lib/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Navbar() {
  const { user, userProfile, isAdmin } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    router.push('/auth/login');
  };

  if (!user) {
    return (
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Faveur Divine</h1>
            </Link>
            <div className="flex gap-4">
              <Link href="/auth/login" className="text-gray-700 hover:text-indigo-600">
                Se connecter
              </Link>
              <Link href="/auth/signup" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Faveur Divine</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600">
              Tableau de bord
            </Link>
            {isAdmin && (
              <Link href="/admin" className="text-gray-700 hover:text-indigo-600">
                Administration
              </Link>
            )}
            <div className="relative group">
              <button className="text-gray-700 hover:text-indigo-600 flex items-center gap-2">
                {userProfile?.displayName || user.email}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <div className="absolute right-0 mt-0 w-48 bg-white rounded-lg shadow-lg invisible group-hover:visible z-10">
                <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Mon Profil
                </Link>
                <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Paramétres
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Tableau de bord
            </Link>
            {isAdmin && (
              <Link href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Administration
              </Link>
            )}
            <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Mon Profil
            </Link>
            <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Paramétres
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}