# Iglu image provenance

Image use was confirmed as partner-approved by the HearthAway project owner in this work session. Broadway's detailed gallery images below are stored locally under `public/iglu/broadway/`. The all-property expansion currently uses one original Iglu image URL per property for its catalogue cover; this keeps the source site's image CDN in the delivery path and makes those covers dependent on URL continuity and hotlink availability. The property cover URLs are recorded in `app/accommodation/iglu-data.ts`. They are image requests only and must never be turned into visitor-facing source-site links.

For long-term reliability, replace the remaining remote property cover URLs with locally hosted partner-approved originals and preserve attribution/provenance. Local files avoid hotlink, URL-change, and third-party cache dependence. Serve appropriately sized/compressed variants for performance. Keep the original files archived so image quality and partner attribution remain auditable. Permission to display an image does not itself establish permission to modify or redistribute it; confirm that the agreement covers local hosting and derivative sizes before recompressing.

| Local asset | Original Iglu asset |
| --- | --- |
| `iglu-broadway-exterior-2.jpg` | `https://iglu.com.au/wp-content/uploads/2017/06/iglu-broadway-exterior-2.jpg` |
| `iglu-broadway-exterior-1.jpg` | `https://iglu.com.au/wp-content/uploads/2017/06/iglu-broadway-exterior-1.jpg` |
| `iglu-broadway-communal-kitchen.jpg` | `https://iglu.com.au/wp-content/uploads/2017/06/iglu-broadway-communal-kitchen.jpg` |
| `iglu-broadway-games.jpg` | `https://iglu.com.au/wp-content/uploads/2017/06/iglu-broadway-games.jpg` |
| `iglu-broadway-study-spaces.jpg` | `https://iglu.com.au/wp-content/uploads/2017/06/iglu-broadway-study-spaces.jpg` |
| `iglu-broadway-surrounds.jpg` | `https://iglu.com.au/wp-content/uploads/2017/06/iglu-broadway-surrounds.jpg` |
| `IgluCentralPark-Gym-1400x739.jpg` | `https://iglu.com.au/wp-content/uploads/2020/08/IgluCentralPark-Gym-1400x739.jpg` |
| `Broadway-Standard-810x1215-room-1.jpg` | `https://iglu.com.au/wp-content/uploads/2017/11/Broadway-Standard-810x1215-room-1.jpg` |
| `Broadway-Standard-810x1215-room-2.jpg` | `https://iglu.com.au/wp-content/uploads/2017/11/Broadway-Standard-810x1215-room-2.jpg` |
| `Broadway-Standard-810x1215-room-3.jpg` | `https://iglu.com.au/wp-content/uploads/2017/11/Broadway-Standard-810x1215-room-3.jpg` |
| `Broadway-Standard-810x1215-room-4.jpg` | `https://iglu.com.au/wp-content/uploads/2017/11/Broadway-Standard-810x1215-room-4.jpg` |
| `Broadway-Standard-810x1215-room-5.jpg` | `https://iglu.com.au/wp-content/uploads/2017/11/Broadway-Standard-810x1215-room-5.jpg` |
| `Broadway-Standard-810x1215-room-6.jpg` | `https://iglu.com.au/wp-content/uploads/2017/11/Broadway-Standard-810x1215-room-6.jpg` |
| `SBR-standard-studio.webp` | `https://iglu.com.au/wp-content/uploads/2024/11/SBR-standard-studio.png` |

The Broadway gallery currently uses static local copies, so those images are independent of Iglu hotlink policy and image URL changes. Existing source files were already modest in size; no lossy recompression was applied after inspection because the trial increased file sizes. Next/image delivery optimization remains a potential follow-up across the shared catalogue template.
