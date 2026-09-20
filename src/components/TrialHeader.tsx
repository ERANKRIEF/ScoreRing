import type { Level, Participant } from '../types'
import { decoyEntries, type TrialDetails } from '../data/session'
import { useLang } from '../i18n/LangContext'

/**
 * The paperwork line for a printed sheet. Every field is optional, so this
 * renders only what was filled in and disappears entirely when nothing was.
 */
export default function TrialHeader({ details, level, participant }: {
  details: TrialDetails
  level: Level
  participant?: Participant
}) {
  const { t } = useLang()

  const items: [string, string | undefined][] = [
    [t.detailDate, details.date],
    [t.detailOrganization, details.organization],
    [t.detailLocation, details.location],
    [t.detailClub, details.club],
    [t.detailJudge, details.judge],
    [t.detailDecoys, decoyEntries(details).map(d => d.name).filter(Boolean).join(', ')],
    [t.extraFields.breed, participant?.breed],
    [t.extraFields.birthDate, participant?.birthDate],
    [t.extraFields.chip, participant?.chip],
    [t.extraFields.pedigree, participant?.pedigree],
    [t.extraFields.scorebook, participant?.scorebook],
    [t.extraFields.catalog, participant?.catalog],
  ]
  const filled = items.filter(([, v]) => v && v.trim())
  if (!filled.length) return null

  return (
    <div className="trial-header">
      <div className="trial-header-level">{t.levelShort(['I', 'II', 'III'][level - 1])}</div>
      <dl>
        {filled.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
