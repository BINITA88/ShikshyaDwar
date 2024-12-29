import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../../auth';
import { Mail, Lock, CheckCircle2, AlertCircle, Cloud } from 'lucide-react';

const Signinpage = () => {
  const navigate = useNavigate();
  const { user } = isAuthenticated();

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToPage: false,
  });

  const { email, password, error, redirectToPage } = values;

  const onhandleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: '', success: false });

    signin({ password, email })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          authenticate(data, () => {
            setValues({ ...values, redirectToPage: true });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (redirectToPage) {
      if (user && user.role === 1) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [redirectToPage, navigate, user]);

  const showError = () => {
    return (
      <div
        className='bg-red-100 text-red-800 p-4 rounded-lg'
        style={{ display: error ? '' : 'none' }}
        role='alert'>
        <strong className='font-bold text-sm mr-2'>Error!</strong>
        <span className='block text-sm sm:inline max-sm:mt-2'>{error}</span>
      </div>
    );
  };

  return (
    <div className="min-h-auto bg-gradient-to-r from-blue-200 to-pink-300 relative overflow-hidden">
      {/* Decorative Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Cloud className="absolute text-white/20 top-20 left-10 w-16 h-16 animate-pulse" />
        <Cloud className="absolute text-white/20 top-40 right-20 w-12 h-12 animate-pulse delay-300" />
        <Cloud className="absolute text-white/20 bottom-20 left-1/4 w-20 h-20 animate-pulse delay-500" />
      </div>

      <div className="flex min-h-screen items-center justify-center">
        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 mb-48 flex items-center justify-center p-6 bg-white/90 backdrop-blur-md">
          <div className="max-w-md w-full space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto h-14 w-14 bg-gradient-to-r from-yellow-600 to-yellow-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-all duration-300 shadow-lg">
                <Mail className="h-7 w-7 text-white" />
              </div>
              <h2 className="mt-4 text-2xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Access your personalized dashboard
              </p>
            </div>

            {/* Alerts */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-lg flex items-center animate-fadeIn">
                <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-3">
                {/* Email Input */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute top-2 left-3 h-5 w-5 text-gray-400 group-focus-within:text-sky-500" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={onhandleChange('email')}
                      className="pl-10 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:outline-none sm:text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="group">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute top-2 left-3 h-5 w-5 text-gray-400 group-focus-within:text-sky-500" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={onhandleChange('password')}
                      className="pl-10 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:outline-none sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                <label htmlFor="remember" className="text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 text-sm font-semibold text-white bg-gradient-to-r from-blue-800 to-blue-800 rounded-lg shadow-lg"
              >
                Sign in
              </button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500">
              Don’t have an account?{' '}
              <Link to="/register" className="font-semibold text-sky-600 hover:text-sky-500">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signinpage;
