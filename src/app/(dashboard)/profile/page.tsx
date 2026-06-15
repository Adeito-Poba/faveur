'use client';

import { useAuth } from '@/lib/auth-context';
import { Navbar } from '@/components/Navbar';
import { LoadingSpinner } from '@/components/Loading';

export default function ProfilePage() {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Profil</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom complet</label>
            <p className="mt-1 text-gray-900">{userProfile?.displayName || 'Non défini'}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-gray-900">{user?.email}</p>
          </div>

          {/* Email Verified */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Vérification email</label>
            <p className="mt-1">
              {user?.emailVerified ? (
                <span className="text-green-600">✓ Vérifié</span>
              ) : (
                <span className="text-red-600">✗ Non vérifié</span>
              )}
            </p>
          </div>

          {/* Account Created */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Compte créé</label>
            <p className="mt-1 text-gray-900">
              {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
            </p>
          </div>

          {/* Subscription */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Abonnement</label>
            <p className="mt-1 text-gray-900 capitalize">
              {userProfile?.subscriptionStatus === 'free' ? 'Plan Gratuit' : 'Plan Premium'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}