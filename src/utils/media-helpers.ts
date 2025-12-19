/**
 * Helper utilities for multilingual media
 */

import type { ContentLanguage } from '../types/translated-content';
import type { LocalizedFilePaths } from '../types/translated-media';

/**
 * Get localized file URL
 */
export function getLocalizedFileUrl(
  baseUrl: string,
  locale: ContentLanguage,
  extension?: string
): string {
  // Pattern 1: /files/uk/document.pdf or /files/en/document.pdf
  if (baseUrl.includes('{lang}')) {
    return baseUrl.replace('{lang}', locale);
  }

  // Pattern 2: /files/document_uk.pdf or /files/document_en.pdf
  if (extension) {
    const withoutExt = baseUrl.replace(new RegExp(`\\.${extension}$`), '');
    return `${withoutExt}_${locale}.${extension}`;
  }

  // Pattern 3: /files/uk/document.pdf (folder structure)
  const pathParts = baseUrl.split('/');
  const filename = pathParts.pop();
  
  // Check if already has locale in path
  if (pathParts[pathParts.length - 1] === 'uk' || pathParts[pathParts.length - 1] === 'en') {
    pathParts[pathParts.length - 1] = locale;
  } else {
    pathParts.push(locale);
  }
  
  return [...pathParts, filename].join('/');
}

/**
 * Generate file paths for all locales
 */
export function generateLocalizedPaths(
  basePattern: string,
  extension: string
): LocalizedFilePaths {
  return {
    uk: getLocalizedFileUrl(basePattern, 'uk', extension),
    en: getLocalizedFileUrl(basePattern, 'en', extension),
  };
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  const match = filename.match(/\.([^.]+)$/);
  return match ? match[1].toLowerCase() : '';
}

/**
 * Get file icon based on extension
 */
export function getFileIcon(extension: string): string {
  const iconMap: Record<string, string> = {
    pdf: '📄',
    doc: '📝',
    docx: '📝',
    xls: '📊',
    xlsx: '📊',
    ppt: '📊',
    pptx: '📊',
    txt: '📃',
    zip: '🗜️',
    rar: '🗜️',
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
    gif: '🖼️',
    mp4: '🎥',
    avi: '🎥',
    mp3: '🎵',
    wav: '🎵',
  };

  return iconMap[extension] || '📎';
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number, locale: ContentLanguage): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = locale === 'uk' 
    ? ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ']
    : ['B', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);

  return `${value.toFixed(2)} ${sizes[i]}`;
}

/**
 * Parse subtitle file to array of cues
 */
export interface SubtitleCue {
  start: number; // seconds
  end: number;   // seconds
  text: string;
}

export function parseSRT(content: string): SubtitleCue[] {
  const cues: SubtitleCue[] = [];
  const blocks = content.trim().split(/\n\s*\n/);

  for (const block of blocks) {
    const lines = block.split('\n');
    if (lines.length < 3) continue;

    // Skip index line
    const timeLine = lines[1];
    const textLines = lines.slice(2);

    // Parse time: 00:00:10,500 --> 00:00:13,000
    const timeMatch = timeLine.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
    
    if (timeMatch) {
      const start = 
        parseInt(timeMatch[1]) * 3600 +
        parseInt(timeMatch[2]) * 60 +
        parseInt(timeMatch[3]) +
        parseInt(timeMatch[4]) / 1000;

      const end =
        parseInt(timeMatch[5]) * 3600 +
        parseInt(timeMatch[6]) * 60 +
        parseInt(timeMatch[7]) +
        parseInt(timeMatch[8]) / 1000;

      cues.push({
        start,
        end,
        text: textLines.join('\n'),
      });
    }
  }

  return cues;
}

/**
 * Convert subtitle cues to VTT format
 */
export function convertToVTT(cues: SubtitleCue[]): string {
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
  };

  let vtt = 'WEBVTT\n\n';

  cues.forEach((cue, index) => {
    vtt += `${index + 1}\n`;
    vtt += `${formatTime(cue.start)} --> ${formatTime(cue.end)}\n`;
    vtt += `${cue.text}\n\n`;
  });

  return vtt;
}

/**
 * Get video thumbnail URL
 */
export function getVideoThumbnail(
  videoUrl: string,
  timestamp: number = 0
): string {
  // For YouTube videos
  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    const videoId = extractYouTubeId(videoUrl);
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  // For Vimeo videos
  if (videoUrl.includes('vimeo.com')) {
    // Vimeo requires API call, return placeholder
    return '/images/video-placeholder.jpg';
  }

  // For local videos, generate thumbnail (requires backend support)
  return `/api/video-thumbnail?url=${encodeURIComponent(videoUrl)}&t=${timestamp}`;
}

/**
 * Extract YouTube video ID from URL
 */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?]+)/,
    /youtu\.be\/([^?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(
  baseUrl: string,
  sizes: number[] = [320, 640, 1024, 1920]
): string {
  return sizes
    .map(size => {
      const url = baseUrl.replace(/\.(jpg|jpeg|png|webp)$/, `_${size}w.$1`);
      return `${url} ${size}w`;
    })
    .join(', ');
}

/**
 * Check if media file exists
 */
export async function checkMediaExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

