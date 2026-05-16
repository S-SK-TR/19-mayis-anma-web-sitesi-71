import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const VideoPlayer = ({ videoSrc, posterSrc, title, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleTimeUpdate = () => {
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progress);
  };

  const handleSeek = (e) => {
    const seekTime = (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "glass-card rounded-2xl overflow-hidden shadow-2xl",
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : "max-w-4xl mx-auto"
      )}
    >
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover"
        />

        {/* Video Controls */}
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          {/* Top Controls */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white drop-shadow-md">{title}</h3>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white"
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>

          {/* Play/Pause Button */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="p-4 rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white"
              >
                <Play size={48} />
              </button>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="flex flex-col gap-2">
            {/* Progress Bar */}
            <div
              onClick={handleSeek}
              className="h-1 bg-white/30 rounded-full cursor-pointer group"
            >
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={togglePlay}
                className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-4 bg-black/10">
        <p className="text-sm text-[var(--text-muted)]">{description}</p>
      </div>
    </motion.div>
  );
};

export { VideoPlayer };