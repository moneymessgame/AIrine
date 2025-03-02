import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "@/components/translations-context";

interface BroadcastButtonProps {
  isSessionActive: boolean
  onClick: () => void
}

export function BroadcastButton({ isSessionActive, onClick }: BroadcastButtonProps) {
  const { t } = useTranslations();
  return (
    <Button
      variant="custom"
      className={`w-full py-7 px-8 text-xl font-bold flex items-center justify-center gap-3 motion-preset-shake rounded-full transition-all duration-300 ${!isSessionActive ? 'bg-foreground text-white hover:bg-foreground/90' : 'bg-destructive text-white hover:bg-destructive/90'}`}
      onClick={onClick}
      style={{ fontFamily: 'var(--font-pt-sans-narrow)' }}
    >
      {isSessionActive && (
        <Badge variant="secondary" className="animate-pulse bg-white/20 text-white px-3 py-1 font-bold rounded-full">
          {t('broadcast.live')}
        </Badge>
      )}
      {isSessionActive ? t('broadcast.end') : t('broadcast.start')}
    </Button>
  )
} 