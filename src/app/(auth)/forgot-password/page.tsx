'use client';

import { useState } from 'react';
import { sendPasswordReset } from '@/lib/auth';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!email) {
        throw new Error('L\'email est obligatoire');
      }

      await sendPasswordReset(email);
      setSuccess('Un email de réinitialisation a été envoyé à votre adresse email');
      setEmail('');
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('user-not-found')) {
          setError('Aucun compte trouvé avec cet email');
        } else {
          setError(err.message);
        }
      } else {
        setError('Erreur lors de l\'envoi de l\'email');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Faveur Divine</h1>
          <p className="mt-2 text-gray-600">Réinitialiser votre mot de passe</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
              {success}
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email associé à votre compte
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="vous@exemple.com"
              required
            />
          </div>

          {/* Info Text */}
          <p className="text-sm text-gray-600">
            Nous vous enverrons un lien de réinitialisation de mot de passe par email.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Envoi en cours...' : 'Envoyer l\'email'}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Vous vous souvenez de votre mot de passe?{' '}
            <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}