import type { I18n } from '../i18n/index.ts'
import { siteLink } from '../lib/from-app.ts'

/**
 * The author's other projects — named, not linked.
 *
 * This used to carry a URL and a translated tagline per project, copied from
 * `products-page/app.js`. Both were removed on the owner's call, and he was right on
 * each count. The URLs pointed at a mix of live apps and product pages and had already
 * drifted from where those projects actually live; the taglines were ten strings in
 * twenty languages, two hundred lines that would need re-translating every time a
 * project's description changed.
 *
 * What is left costs nothing to keep true: the names are proper nouns, and the single
 * "All products" button goes to the page whose job is to be the accurate, maintained
 * list. When a project moves, that page moves with it and this app needs no edit.
 */
const PROJECTS = [
  { icon: '🎬', name: 'FilmTable' },
  { icon: '🎮', name: 'GamesTable' },
  { icon: '📚', name: 'BooksTable' },
  { icon: '🔭', name: 'Science Timeline' },
  { icon: '🌍', name: 'Languages of the World' },
  { icon: '🗣️', name: 'Lingary' },
  { icon: '🎯', name: 'AI Job Search' },
  { icon: '🔤', name: 'AI Screen Translator' },
  { icon: '💡', name: 'AI Prompt Suggester' },
  { icon: '📺', name: 'Double Subtitles' },
]

export function MoreFromAuthor({ i18n }: { i18n: I18n }) {
  return (
    <section className="card" aria-labelledby="projects-heading">
      <div className="card-head">
        <h2 id="projects-heading">{i18n.t('projects.title')}</h2>
        <a
          className="ghost-button"
          href={siteLink('https://mrwd.github.io/')}
          target="_blank"
          rel="noreferrer noopener"
        >
          {i18n.t('projects.all')}
        </a>
      </div>

      <ul className="projects">
        {PROJECTS.map((project) => (
          <li key={project.name}>
            <span className="project-icon" aria-hidden="true">
              {project.icon}
            </span>
            <span className="project-name">{project.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
