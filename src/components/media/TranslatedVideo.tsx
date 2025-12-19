/**
 * Video player component with translated subtitles
 */

import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';
import type { ContentLanguage } from '../../types/translated-content';
import type { TranslatedVideo as TranslatedVideoType } from '../../types/translated-media';

interface TranslatedVideoProps {
  /**
   * Video data
   */
  video: TranslatedVideoType;

  /**
   * Auto-select subtitles based on current language
   */
  autoSelectSubtitles?: boolean;

  /**
   * Show video controls
   */
  controls?: boolean;

  /**
   * Autoplay video
   */
  autoplay?: boolean;

  /**
   * Loop video
   */
  loop?: boolean;

  /**
   * Mute by default
   */
  muted?: boolean;

  /**
   * CSS classes
   */
  className?: string;

  /**
   * Poster image
   */
  poster?: string;
}

/**
 * TranslatedVideo Component
 * 
 * Video player with language-specific subtitles and descriptions
 * 
 * @example
 * <TranslatedVideo
 *   video={videoData}
 *   autoSelectSubtitles
 *   controls
 * />
 */
const TranslatedVideo = ({
  video,
  autoSelectSubtitles = true,
  controls = true,
  autoplay = false,
  loop = false,
  muted = false,
  className = '',
  poster,
}: TranslatedVideoProps) => {
  const { t, i18n } = useTranslation('media');
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState<string | null>(null);

  const currentLang = i18n.language as ContentLanguage;
  const videoInfo = video.translations[currentLang];
  const subtitles = videoInfo.subtitles || [];

  // Auto-select subtitles on mount
  useState(() => {
    if (autoSelectSubtitles && subtitles.length > 0) {
      const langSubtitle = subtitles.find(s => s.language === currentLang);
      if (langSubtitle) {
        setSelectedSubtitle(langSubtitle.url);
      }
    }
  });

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      {/* Video element */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={poster || video.thumbnail}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="w-full"
        crossOrigin="anonymous"
      >
        {/* Subtitles */}
        {subtitles.map((subtitle, index) => (
          <track
            key={index}
            kind="subtitles"
            src={subtitle.url}
            srcLang={subtitle.language}
            label={subtitle.label || subtitle.language.toUpperCase()}
            default={
              autoSelectSubtitles && subtitle.language === currentLang
            }
          />
        ))}
        {t('videos.notSupported')}
      </video>

      {/* Video info overlay (when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4">
          <h3 className="text-2xl font-bold mb-2 text-center">
            {videoInfo.title}
          </h3>
          {videoInfo.description && (
            <p className="text-sm text-center max-w-2xl">
              {videoInfo.description}
            </p>
          )}
        </div>
      )}

      {/* Custom controls */}
      {controls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress bar */}
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full mb-2 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-slider"
          />

          {/* Control buttons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="hover:text-accent transition-colors"
                aria-label={isPlaying ? t('videos.pause') : t('videos.play')}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>

              {/* Mute/Unmute */}
              <button
                onClick={toggleMute}
                className="hover:text-accent transition-colors"
                aria-label={isMuted ? t('videos.unmute') : t('videos.mute')}
              >
                {isMuted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </button>

              {/* Time */}
              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Settings (subtitles) */}
              {subtitles.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="hover:text-accent transition-colors"
                    aria-label={t('videos.subtitles')}
                  >
                    <Settings className="h-5 w-5" />
                  </button>

                  {showSettings && (
                    <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-md shadow-lg py-2 min-w-[150px]">
                      <div className="px-3 py-1 text-xs text-gray-400 uppercase">
                        {t('videos.subtitles')}
                      </div>
                      <button
                        onClick={() => {
                          setSelectedSubtitle(null);
                          setShowSettings(false);
                        }}
                        className="w-full px-3 py-2 text-sm text-left hover:bg-gray-800 transition-colors"
                      >
                        {t('videos.noSubtitles')}
                      </button>
                      {subtitles.map((subtitle, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedSubtitle(subtitle.url);
                            setShowSettings(false);
                          }}
                          className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-800 transition-colors ${
                            selectedSubtitle === subtitle.url ? 'text-accent' : ''
                          }`}
                        >
                          {subtitle.label || subtitle.language.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="hover:text-accent transition-colors"
                aria-label={t('videos.fullscreen')}
              >
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslatedVideo;

