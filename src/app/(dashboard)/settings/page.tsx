'use client';

import { Navbar } from '@/components/Navbar';

export default function SettingsPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Paramétrage</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            <div className="mt-4 space-y-4">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                <span className="ml-3 text-gray-700">Recevoir les notifications par email</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                <span className="ml-3 text-gray-700">Rappels pour les plans de lecture</span>
              </label>
            </div>
          </div>

          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-900">Confidentialité</h2>
            <div className="mt-4 space-y-4">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-indigo-600" />
                <span className="ml-3 text-gray-700">Profil public</span>
              </label>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 text-red-600">Zone de danger</h2>
            <p className="text-gray-600 text-sm mt-2">Supprimer votre compte de manière permanente</p>
            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </>
  );
}