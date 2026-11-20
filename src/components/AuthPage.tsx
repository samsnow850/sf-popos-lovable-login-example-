import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import logoAsset from '@/assets/sf-popos-icon.png.asset.json';
import gardenAsset from '@/assets/sf-popos-garden.png.asset.json';
import { AppleLogo, GoogleLogo, XLogo } from './BrandIcons';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { passwordsMatch } from '@/lib/auth-validation';

type AuthMode = 'login' | 'signup';

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [confirmationError, setConfirmationError] = useState(false);
  const [notice, setNotice] = useState('');
  const [resetOpen, setResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetNotice, setResetNotice] = useState('');
  const isLogin = mode === 'login';

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('mode') === 'signup') setMode('signup');
  }, []);

  function switchMode(next: AuthMode) {
    setMode(next);
    setNotice('');
    setConfirmationError(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLogin && !passwordsMatch(signupPassword, confirmation)) {
      setConfirmationError(true);
      return;
    }
    setConfirmationError(false);
    setNotice('Account sign-in and registration are not available yet.');
  }

  return (
    <div className="auth-page min-h-svh bg-background text-foreground">
      <main className="min-h-svh w-full lg:flex lg:h-svh lg:min-h-[760px] lg:gap-4 lg:p-4">
        <aside className="relative hidden h-full w-[52%] shrink-0 overflow-hidden rounded-3xl bg-card lg:block" aria-label="SF POPOS garden showcase">
          <img src={gardenAsset.url} alt="Illustrated view of a lush San Francisco rooftop garden with benches and the city skyline" className="absolute inset-0 h-full w-full object-cover" />
          <div className="relative flex flex-col items-center px-8 pt-10 text-center text-primary-foreground xl:px-12 xl:pt-14">
            <Button variant="ghost" onClick={() => switchMode('login')} className="h-auto gap-3 p-0 text-primary-foreground hover:bg-transparent hover:text-primary-foreground" aria-label="SF POPOS home">
              <img src={logoAsset.url} alt="" className="h-14 w-12 object-contain" />
              <span className="text-[23px] font-semibold">SF POPOS</span>
            </Button>
            <h2 className="mt-5 max-w-[460px] text-[32px] font-medium leading-tight xl:text-[38px]">A little open space.<br />A whole new city.</h2>
            <p className="mt-3 max-w-[400px] text-sm leading-relaxed">Discover San Francisco’s privately owned public open spaces.</p>
          </div>
        </aside>
        <section className="mx-auto flex min-h-svh w-full max-w-[440px] flex-col justify-center px-6 py-8 sm:px-8 lg:min-h-0 lg:max-w-none lg:flex-1 lg:overflow-y-auto lg:px-12 lg:py-6 xl:px-20">
        <div className="mx-auto w-full max-w-[440px] lg:my-auto">
        <Button variant="ghost" onClick={() => switchMode('login')} className="mb-7 h-auto justify-start gap-3 self-start p-0 hover:bg-transparent lg:hidden" aria-label="SF POPOS home">
          <img src={logoAsset.url} alt="SF POPOS park and bridge logo" className="h-14 w-12 object-contain" />
          <span className="text-xl font-semibold">SF POPOS</span>
        </Button>

        <header>
          <h1 className="text-[28px] font-medium leading-tight">{isLogin ? 'Log in to SF POPOS' : 'Create your account'}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Explore San Francisco’s public open spaces.</p>
        </header>

        <div className="mt-6 grid grid-cols-3 gap-3" role="group" aria-label="Continue with social account">
          <SocialButton icon={<XLogo />} label="Continue with X" onClick={() => setNotice('X sign-in is not available yet.')} />
          <SocialButton icon={<AppleLogo />} label="Continue with Apple" onClick={() => setNotice('Apple sign-in is not available yet.')} />
          <SocialButton icon={<GoogleLogo />} label="Continue with Google" onClick={() => setNotice('Google sign-in is not available yet.')} />
        </div>
        <div className="my-5 flex items-center gap-3" aria-hidden="true">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={submit} className="space-y-4">
          {isLogin ? (
            <>
              <InputGroup id="login-email" label="Email address" type="email" autoComplete="email" value={email} onChange={setEmail} />
              <PasswordInput id="login-password" label="Password" autoComplete="current-password" value={password} onChange={setPassword} labelAction={
                <Button variant="link" type="button" className="h-auto p-0 text-xs font-normal text-muted-foreground" onClick={() => { setResetEmail(email); setResetNotice(''); setResetOpen(true); }}>Forgot password?</Button>
              } />
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <InputGroup id="signup-first-name" label="First name" autoComplete="given-name" value={firstName} onChange={setFirstName} />
                <InputGroup id="signup-last-name" label="Last name" autoComplete="family-name" value={lastName} onChange={setLastName} />
              </div>
              <InputGroup id="signup-email" label="Email address" type="email" autoComplete="email" value={signupEmail} onChange={setSignupEmail} />
              <PasswordInput id="signup-password" label="Password" autoComplete="new-password" value={signupPassword} onChange={setSignupPassword} />
              <PasswordInput id="signup-confirm-password" label="Confirm password" autoComplete="new-password" value={confirmation} onChange={(value) => { setConfirmation(value); setConfirmationError(false); }} invalid={confirmationError} />
              {confirmationError && <p id="confirmation-error" role="alert" className="text-sm text-destructive">Passwords do not match.</p>}
            </>
          )}
          <Button type="submit" className="h-12 w-full rounded-lg font-semibold">{isLogin ? 'Continue with Email' : 'Create account'}</Button>
          {notice && <p role="status" className="text-center text-sm leading-relaxed text-muted-foreground">{notice}</p>}
        </form>

        <p className="mt-6 text-center text-[13px] text-muted-foreground">
          {isLogin ? 'Don’t have an account? ' : 'Already have an account? '}
          <Button variant="link" className="h-auto p-0 text-[13px]" onClick={() => switchMode(isLogin ? 'signup' : 'login')}>{isLogin ? 'Sign up' : 'Sign in'}</Button>
        </p>
        </div>
        </section>
      </main>

      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent className="w-[calc(100%-32px)] max-w-[400px] rounded-lg border-border bg-card text-card-foreground">
          <DialogTitle className="pr-6">Forgot password?</DialogTitle>
          <DialogDescription>Enter the email address associated with your SF POPOS account.</DialogDescription>
          <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); setResetNotice('Password reset is not available yet. No email has been sent.'); }}>
            <InputGroup id="reset-email" label="Email address" type="email" autoComplete="email" value={resetEmail} onChange={setResetEmail} />
            <Button type="submit" className="h-11 w-full rounded-lg">Send reset link</Button>
            {resetNotice && <p role="status" className="text-sm leading-relaxed text-muted-foreground">{resetNotice}</p>}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SocialButton({ icon, label, onClick }: { icon: ReactNode; label: string; onClick: () => void }) {
  return <Button variant="outline" onClick={onClick} aria-label={label} title={label} className="h-11 rounded-lg">{icon}</Button>;
}

type InputProps = { id: string; label: string; type?: string; autoComplete: string; value: string; onChange: (value: string) => void };

function InputGroup({ id, label, type = 'text', autoComplete, value, onChange }: InputProps) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-foreground/85">{label}</label>
      <input id={id} name={id} type={type} autoComplete={autoComplete} required value={value} onChange={(event) => onChange(event.target.value)} className="auth-input" />
    </div>
  );
}

function PasswordInput({ id, label, autoComplete, value, onChange, labelAction, invalid = false }: InputProps & { labelAction?: ReactNode; invalid?: boolean }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-[13px] font-medium text-foreground/85">{label}</label>
        {labelAction}
      </div>
      <div className="relative">
        <input id={id} name={id} type={visible ? 'text' : 'password'} required autoComplete={autoComplete} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={invalid} aria-describedby={invalid ? 'confirmation-error' : undefined} className="auth-input !pr-12" />
        <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1 h-9 w-9 text-muted-foreground" onClick={() => setVisible(!visible)} aria-label={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`} title={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}>
          {visible ? <EyeOff /> : <Eye />}
        </Button>
      </div>
    </div>
  );
}
