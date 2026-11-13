import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Eye, EyeOff, Fingerprint, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import robotaxiTrioAsset from '@/assets/robotaxi-trio.png.asset.json';
const robotaxiTrio = robotaxiTrioAsset.url;
import { AppleLogo, GoogleLogo, RobotaxiTrackerMark, XLogo } from './BrandIcons';
import { Footer } from './Footer';

type AuthMode = 'login' | 'signup';

export function AuthPage() {
  const shouldReduceMotion = useReducedMotion();
  const [mode, setMode] = useState<AuthMode>('login');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'signup') setMode('signup');
  }, []);

  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Signup fields
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [signupWithPassword, setSignupWithPassword] = useState(false);
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const [vehicleImageError, setVehicleImageError] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  useEffect(() => {
    if (!showForgotPasswordModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowForgotPasswordModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showForgotPasswordModal]);

  const isLogin = mode === 'login';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setSignupWithPassword(false);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white selection:bg-white/25 flex flex-col">
      <main className="flex min-h-screen w-full p-2 lg:h-screen lg:overflow-hidden lg:p-4">
      {/* Left Column: Steady Purple Gradient Backdrop + Upper Brand & Grounded Vehicle Lineup */}
      <div className="hidden lg:flex w-[52%] relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/[0.08] h-full bg-[#090514] flex-col justify-between pt-10 xl:pt-14 pb-6 px-8 xl:px-12">
        <div className="absolute inset-0 purple-hero-gradient" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06030D]/80 via-transparent to-black/15"
          aria-hidden="true"
        />

        {/* Upper Brand Lockup & Editorial Copy */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative z-10 flex flex-col items-center text-center pt-1"
        >
          <a
            href="https://robotaxitracker.com/"
            onClick={(e) => {
              e.preventDefault();
              switchMode('login');
            }}
            className="inline-flex items-center gap-3 text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-lg"
          >
            <RobotaxiTrackerMark className="w-8 h-8 shrink-0" />
            <span className="text-[23px] tracking-[-0.03em] leading-none">
              <span className="font-bold">Robotaxi</span>
              <span className="font-normal text-white/90">Tracker</span>
            </span>
          </a>

          <h2 className="mt-5 text-[32px] xl:text-[38px] font-medium tracking-[-0.025em] leading-[1.13] text-white max-w-[460px] text-balance">
            Every autonomous ride, tracked in one place.
          </h2>
          <p className="mt-2.5 text-[14.5px] text-white/75 max-w-[400px] leading-relaxed">
            Log trips, spot{' '}
            <a
              href="https://waymo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline text-white/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm"
            >
              Waymo
            </a>
            ,{' '}
            <a
              href="https://www.tesla.com/robotaxi"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline text-white/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm"
            >
              Cybercab
            </a>
            , and{' '}
            <a
              href="https://zoox.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline text-white/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm"
            >
              Zoox
            </a>{' '}
            fleets on the street, and map the rollout live.
          </p>
        </motion.div>

        {/* Lower Enlarged Autonomous Vehicle Trio */}
        {!vehicleImageError && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="relative z-10 mt-auto w-full flex flex-col items-center justify-end pt-2"
          >
            <div className="relative w-full max-w-[780px] flex items-end justify-center">
              <img
                src={robotaxiTrio}
                alt="Waymo, Tesla Cybercab, and Zoox autonomous vehicles lined up side by side"
                referrerPolicy="no-referrer"
                onError={() => setVehicleImageError(true)}
                className="relative z-10 w-full scale-[1.06] origin-bottom h-auto object-contain select-none drop-shadow-[0_24px_38px_rgba(0,0,0,0.65)]"
              />
            </div>

            <div className="mt-1 flex items-center gap-2.5 text-[12px] text-white/65 tracking-wide">
              <a
                href="https://waymo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm"
              >
                Waymo
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://www.tesla.com/robotaxi"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm"
              >
                Tesla Cybercab
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://zoox.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm"
              >
                Zoox
              </a>
            </div>
          </motion.div>
        )}
      </div>

      {/* Right Column: Tall Auth Panel */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 lg:py-6 px-4 sm:px-10 lg:px-12 xl:px-20 overflow-y-auto">
        <motion.div
          key={mode}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-[440px] my-auto"
        >
          {/* Mobile/Tablet Brand Lockup */}
          <a
            href="https://robotaxitracker.com/"
            onClick={(e) => {
              e.preventDefault();
              switchMode('login');
            }}
            className="lg:hidden inline-flex items-center gap-2.5 text-white whitespace-nowrap shrink-0 mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-lg"
          >
            <RobotaxiTrackerMark className="w-7 h-7 shrink-0" />
            <span className="text-[20px] tracking-[-0.03em] leading-none">
              <span className="font-bold">Robotaxi</span>
              <span className="font-normal text-white/90">Tracker</span>
            </span>
          </a>

          {isLogin ? (
            <>
              <div>
                <h1 className="text-[28px] sm:text-[30px] font-medium tracking-tight text-white leading-tight">
                  Log in to Robotaxi Tracker
                </h1>
                <p className="mt-1.5 text-[14px] text-white/50">
                  Track autonomous fleets in real time
                </p>
              </div>

              {/* OAuth Row */}
              <div
                className="mt-6 grid grid-cols-3 gap-3"
                role="group"
                aria-label="Single sign-on options"
              >
                <SocialButton
                  icon={<XLogo className="w-[15px] h-[15px] text-white" />}
                  label="Continue with X"
                />
                <SocialButton
                  icon={<AppleLogo className="w-[17px] h-[17px] text-white" />}
                  label="Continue with Apple"
                />
                <SocialButton
                  icon={<GoogleLogo className="w-[17px] h-[17px]" />}
                  label="Continue with Google"
                />
              </div>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3" aria-hidden="true">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[11.5px] font-medium text-white/40 uppercase tracking-widest">
                  or
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <InputGroup
                  id="login-email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={setEmail}
                />

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="login-password"
                      className="block text-[13px] font-medium text-white/85"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPasswordModal(true)}
                      className="text-[12px] text-white/45 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 w-full rounded-xl bg-brand-gray border border-white/[0.08] hover:border-white/[0.16] px-4 pr-11 text-[14px] text-white placeholder:text-white/25 transition-colors focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    {password.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/50 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" aria-hidden="true" />
                        ) : (
                          <Eye className="w-4 h-4" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-1 space-y-2.5">
                  <button
                    type="submit"
                    className="w-full h-12 bg-white text-black font-semibold text-[14px] rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black whitespace-nowrap cursor-pointer"
                  >
                    Continue with Email
                  </button>

                  <button
                    type="button"
                    className="w-full h-11 bg-black border border-white/12 text-white font-medium text-[13.5px] rounded-xl hover:bg-white/[0.06] hover:border-white/20 active:scale-[0.98] inline-flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 whitespace-nowrap cursor-pointer"
                  >
                    <Fingerprint className="w-4 h-4 text-white/75" aria-hidden="true" />
                    <span>Sign in with a passkey</span>
                  </button>
                </div>
              </form>

              <p className="mt-6 text-center text-[13px] text-white/50">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className="font-medium text-white hover:underline focus-visible:outline-none focus-visible:underline cursor-pointer"
                >
                  Sign up
                </button>
              </p>
            </>
          ) : (
            <>
              <div>
                <h1 className="text-[28px] sm:text-[30px] font-medium tracking-tight text-white leading-tight">
                  Create your account
                </h1>
                <p className="mt-1.5 text-[14px] text-white/50">
                  Log rides, report sightings, and build your rider profile.
                </p>
              </div>

              {/* OAuth Row */}
              <div className="mt-6">
                <div
                  className="grid grid-cols-3 gap-3"
                  role="group"
                  aria-label="Continue with social account"
                >
                  <SocialButton
                    icon={<XLogo className="w-[15px] h-[15px] text-white" />}
                    label="Continue with X"
                  />
                  <SocialButton
                    icon={<AppleLogo className="w-[17px] h-[17px] text-white" />}
                    label="Continue with Apple"
                  />
                  <SocialButton
                    icon={<GoogleLogo className="w-[17px] h-[17px]" />}
                    label="Continue with Google"
                  />
                </div>
                <p className="mt-2 text-[12px] text-white/45 leading-relaxed">
                  Already used Google or X here? They sign you back in to the same account.
                </p>
              </div>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3" aria-hidden="true">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[11.5px] font-medium text-white/40 uppercase tracking-widest">
                  or continue with
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Sign Up Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label
                    htmlFor="signup-username"
                    className="block text-[13px] font-medium text-white/85 mb-1.5"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <span
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-white/40 select-none"
                      aria-hidden="true"
                    >
                      @
                    </span>
                    <input
                      id="signup-username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      autoCapitalize="none"
                      spellCheck={false}
                      value={username}
                      onChange={(e) => {
                        const normalized = e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9_]/g, '');
                        setUsername(normalized);
                      }}
                      aria-describedby="username-help"
                      className="h-11 w-full rounded-xl bg-brand-gray border border-white/[0.08] hover:border-white/[0.16] pl-8 pr-4 text-[14px] text-white placeholder:text-white/25 transition-colors focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>
                  <p id="username-help" className="mt-1.5 text-[11.5px] text-white/45 leading-relaxed">
                    {username
                      ? `Profile link: robotaxitracker.com/@${username}`
                      : 'Your profile link and sign-in name. Lowercase letters, numbers and underscores.'}
                  </p>
                </div>

                <InputGroup
                  id="signup-display-name"
                  label={
                    <>
                      Display name <span className="font-normal text-white/40">(optional)</span>
                    </>
                  }
                  type="text"
                  autoComplete="name"
                  value={displayName}
                  onChange={setDisplayName}
                />

                {/* Sign-in Method Segmented Switcher */}
                <div>
                  <span
                    id="signup-method-label"
                    className="block text-[13px] font-medium text-white/85 mb-1.5"
                  >
                    Sign-in method
                  </span>
                  <div
                    role="tablist"
                    aria-labelledby="signup-method-label"
                    className="grid grid-cols-2 gap-1 rounded-xl bg-[#111111] p-1 border border-white/10"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={!signupWithPassword}
                      onClick={() => setSignupWithPassword(false)}
                      className={`h-[38px] rounded-lg text-[13px] font-medium inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                        !signupWithPassword
                          ? 'bg-white text-black shadow-sm'
                          : 'text-white/55 hover:text-white'
                      }`}
                    >
                      <Fingerprint className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Passkey</span>
                    </button>

                    <button
                      type="button"
                      role="tab"
                      aria-selected={signupWithPassword}
                      onClick={() => setSignupWithPassword(true)}
                      className={`h-[38px] rounded-lg text-[13px] font-medium inline-flex items-center justify-center whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                        signupWithPassword
                          ? 'bg-white text-black shadow-sm'
                          : 'text-white/55 hover:text-white'
                      }`}
                    >
                      <span>Password</span>
                    </button>
                  </div>

                  {!signupWithPassword ? (
                    <p className="mt-2 text-[12px] text-white/45 leading-relaxed">
                      Sign in with Face ID, Touch ID or your device PIN — nothing to remember.
                    </p>
                  ) : (
                    <div className="mt-3">
                      <label
                        htmlFor="signup-password"
                        className="block text-[13px] font-medium text-white/85 mb-1.5"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="signup-password"
                          name="password"
                          type={showSignupPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="h-11 w-full rounded-xl bg-brand-gray border border-white/[0.08] hover:border-white/[0.16] px-4 pr-11 text-[14px] text-white placeholder:text-white/25 transition-colors focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                        />
                        {signupPassword.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setShowSignupPassword((prev) => !prev)}
                            aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/50 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 cursor-pointer"
                          >
                            {showSignupPassword ? (
                              <EyeOff className="w-4 h-4" aria-hidden="true" />
                            ) : (
                              <Eye className="w-4 h-4" aria-hidden="true" />
                            )}
                          </button>
                        )}
                      </div>
                      <p className="mt-1.5 text-[11.5px] text-white/45">
                        Requires at least 8 characters.
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-white text-black font-semibold text-[14px] rounded-xl hover:bg-white/90 active:scale-[0.98] inline-flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black whitespace-nowrap cursor-pointer mt-1"
                >
                  {!signupWithPassword && (
                    <Fingerprint className="w-4 h-4" aria-hidden="true" />
                  )}
                  <span>
                    {signupWithPassword ? 'Create account' : 'Create with a passkey'}
                  </span>
                </button>
              </form>

              <p className="mt-6 text-center text-[13px] text-white/50">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="font-medium text-white hover:underline focus-visible:outline-none focus-visible:underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            </>
          )}

          {/* Terms & Privacy Policy */}
          <p className="mt-3.5 text-center text-[11.5px] text-white/40 leading-relaxed">
            By continuing you agree to the{' '}
            <a
              href="https://robotaxitracker.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 underline decoration-white/25 underline-offset-2 hover:text-white transition-colors"
            >
              Terms
            </a>{' '}
            and{' '}
            <a
              href="https://robotaxitracker.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 underline decoration-white/25 underline-offset-2 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>
        </motion.div>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPasswordModal && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
            onClick={() => setShowForgotPasswordModal(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="forgot-password-title"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 6 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[400px] rounded-2xl bg-[#111111] border border-white/12 p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <h2
                  id="forgot-password-title"
                  className="text-[17px] font-semibold tracking-tight text-white"
                >
                  Password reset
                </h2>
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(false)}
                  aria-label="Close modal"
                  className="-mr-1 -mt-1 rounded-lg p-1.5 text-white/50 hover:bg-white/[0.06] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <p className="mt-3 text-[13.5px] leading-relaxed text-white/70">
                Passwords can&apos;t be reset by email yet. Sign in another way you&apos;ve linked,
                for example, Apple, Google, X, or Passkey. Then set a new password in{' '}
                <span className="font-medium text-white/90">Settings &gt; Sign-In Methods</span>.
              </p>

              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(false)}
                className="mt-5 w-full h-11 rounded-xl bg-white text-black font-semibold text-[13.5px] hover:bg-white/90 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function SocialButton({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="h-11 bg-black border border-white/12 rounded-xl flex items-center justify-center hover:bg-white/[0.06] hover:border-white/20 active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 cursor-pointer"
    >
      {icon}
    </button>
  );
}

function InputGroup({
  id,
  label,
  type = 'text',
  autoComplete,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: ReactNode;
  type?: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-medium text-white/85 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl bg-brand-gray border border-white/[0.08] hover:border-white/[0.16] px-4 text-[14px] text-white placeholder:text-white/25 transition-colors focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
      />
    </div>
  );
}
