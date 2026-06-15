'use client';

import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { LoadingSpinner } from '@/components/Loading';

export default function DashboardPage() {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Redirection...</p>
      </div>
    );
  }

  const isPremium = userProfile?.subscriptionStatus !== 'free';

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenue, {userProfile?.displayName || user.email}!
          </h1>
          <p className="text-gray-600 mt-2">
            Voici votre tableau de bord personnel
          </p>
        </div>

        {/* Subscription Status */}
        <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Statut d'abonnement</h2>
              <p className="text-gray-600 mt-1">
                {isPremium ? (
                  <span className="text-green-600 font-semibold">
                    ✓ Abonnement Premium actif
                  </span>
                ) : (
                  <span className="text-gray-600">
                    Plan gratuit
                  </span>
                )}
              </p>
              {userProfile?.subscriptionEndDate && (
                <p className="text-sm text-gray-500 mt-2">
                  Renouvellement le {new Date(userProfile.subscriptionEndDate).toLocaleDateString('fr-FR')}
                </p>
              )}
            </div>
            {!isPremium && (
              <Link
                href="/pricing"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                Passer à Premium
              </Link>
            )}
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Prayers */}
          <Link href="/dashboard/prayers" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-200">
            <div className="text-3xl mb-2">🙏</div>
            <h3 className="font-semibold text-gray-900">Mes Prières</h3>
            <p className="text-sm text-gray-600 mt-2">Générer et gérer vos prières</p>
          </Link>

          {/* Meditations */}
          <Link href="/dashboard/meditations" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-200">
            <div className="text-3xl mb-2">🧝</div>
            <h3 className="font-semibold text-gray-900">Méditations</h3>
            <p className="text-sm text-gray-600 mt-2">Explorez les méditations bibliques</p>
          </Link>

          {/* Spiritual Journal */}
          <Link href="/dashboard/journal" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-200">
            <div className="text-3xl mb-2">📔</div>
            <h3 className="font-semibold text-gray-900">Journal Spirituel</h3>
            <p className="text-sm text-gray-600 mt-2">Tenez votre journal spirituel</p>
          </Link>

          {/* Reading Plans */}
          <Link href="/dashboard/reading-plans" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-200">
            <div className="text-3xl mb-2">📖</div>
            <h3 className="font-semibold text-gray-900">Plans de Lecture</h3>
            <p className="text-sm text-gray-600 mt-2">Suivi des plans de lecture biblique</p>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
            <p className="text-gray-600 text-sm">Prières créées</p>
            <p className="text-3xl font-bold text-indigo-600 mt-2">0</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
            <p className="text-gray-600 text-sm">Articles lus</p>
            <p className="text-3xl font-bold text-indigo-600 mt-2">0</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
            <p className="text-gray-600 text-sm">Entrées du journal</p>
            <p className="text-3xl font-bold text-indigo-600 mt-2">0</p>
          </div>
        </div>
      </div>
    </>
  );
}