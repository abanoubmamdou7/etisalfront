
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Plus, LayoutDashboard, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { logout } from '@/lib/auth';
import { toast } from 'sonner';
import SetupMenu from '@/components/SetupMenu';
import { useTheme } from 'next-themes';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showNewOrderButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showNewOrderButton = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, isRTL } = useLanguage();
  const { theme, setTheme } = useTheme();

  const handleBack = () => {
    navigate(-1);
  };

  const handleNewOrder = () => {
    navigate('/new-order');
  };

  const handleDashboard = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-md border-b px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button
              onClick={handleBack}
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-secondary transition-all duration-200"
            >
              <ChevronLeft className={cn("h-5 w-5", isRTL && "rotate-180")} />
              <span className="sr-only">{t('app.back')}</span>
            </Button>
          )}
          <div className="flex items-center gap-2">
            <img
              src='../../Etsal.jpg'
              alt="Irisal Logo"
              className="h-8 w-auto"
            />
            <h1 className={cn(
              "text-xl font-semibold",
              showBackButton && "ml-0"
            )}>
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SetupMenu />

          <Button
            onClick={toggleTheme}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <LanguageSwitcher />

          {location.pathname !== '/' && (
            <Button
              onClick={handleDashboard}
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>{t('app.dashboard')}</span>
            </Button>
          )}

          {showNewOrderButton && (
            <Button
              onClick={handleNewOrder}
              className="gap-1"
              size="sm"
            >
              <Plus className="h-4 w-4" />
              <span>{t('app.new_order')}</span>
            </Button>
          )}

          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="gap-1"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">{t('app.logout')}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
