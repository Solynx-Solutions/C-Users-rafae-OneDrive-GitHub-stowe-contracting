import Image from 'next/image';
import { stoweProjectPhotos } from '@/data/stowe-project-photos';
import styles from './stowe-project-gallery.module.css';
export function ProjectGallery({ featured = false }: { featured?: boolean }) {
 const photos = featured ? stoweProjectPhotos.slice(0,3) : stoweProjectPhotos;
 return <div className={`${styles.gallery} ${featured ? styles.featured : ''}`}>
 {photos.map((photo,index)=><figure className={styles.figure} key={photo.src}>
 <a className={styles.imageLink} href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`View full photograph: ${photo.title}`}>
 <Image src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} sizes="(min-width: 900px) 45vw, 100vw"/><span className={styles.enlarge} aria-hidden="true">↗</span></a>
 <figcaption><span className={styles.number}>{String(index+1).padStart(2,'0')}</span><h3>{photo.title}</h3><span className={styles.full}>View full photograph ↗</span></figcaption></figure>)}
 </div>;
}
