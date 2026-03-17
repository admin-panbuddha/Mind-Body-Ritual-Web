import Image from 'next/image'

/**
 * Reusable SVG icon component.
 * Icons live in /public/icons/ and are served as images.
 * Uses next/image for optimization + proper alt text.
 *
 * @param name - filename without extension (e.g. "ui_Icon_Breath")
 * @param size - pixel size (width & height), default 32
 * @param className - optional Tailwind classes
 * @param alt - accessible label, defaults to name
 */
export function Icon({
  name,
  size = 32,
  className = '',
  alt,
}: {
  name: string
  size?: number
  className?: string
  alt?: string
}) {
  return (
    <Image
      src={`/icons/${name}.svg`}
      width={size}
      height={size}
      alt={alt ?? name.replace(/ui_[Ii]con_/g, '').replace(/[-_]/g, ' ')}
      className={className}
      unoptimized
    />
  )
}
