import React from 'react'
import Card from '../../components/ui/Card'
import { JOURS_SEMAINE, HEURES_COURS } from '../../utils/constants'

const EmploiDuTemps = () => {
  // Données mockées de l'emploi du temps
  const emploiDuTemps = {
    'Lundi': {
      '08:00 - 09:00': { matiere: 'Mathématiques', salle: 'A101', enseignant: 'M. Dupont' },
      '09:00 - 10:00': { matiere: 'Français', salle: 'B205', enseignant: 'Mme Martin' },
      '10:15 - 11:15': { matiere: 'Physique', salle: 'Lab1', enseignant: 'M. Durand' },
      '11:15 - 12:15': { matiere: 'Chimie', salle: 'Lab2', enseignant: 'Mme Bernard' },
      '14:00 - 15:00': { matiere: 'Histoire', salle: 'C301', enseignant: 'M. Petit' },
      '15:00 - 16:00': { matiere: 'Géographie', salle: 'C301', enseignant: 'Mme Dubois' }
    },
    'Mardi': {
      '08:00 - 09:00': { matiere: 'Anglais', salle: 'B201', enseignant: 'Mme Johnson' },
      '09:00 - 10:00': { matiere: 'Mathématiques', salle: 'A101', enseignant: 'M. Dupont' },
      '10:15 - 11:15': { matiere: 'Biologie', salle: 'Lab3', enseignant: 'M. Moreau' },
      '11:15 - 12:15': { matiere: 'EPS', salle: 'Gymnase', enseignant: 'M. Laurent' },
      '14:00 - 15:00': { matiere: 'Français', salle: 'B205', enseignant: 'Mme Martin' },
      '15:00 - 16:00': { matiere: 'Philosophie', salle: 'D401', enseignant: 'M. Rousseau' }
    },
    'Mercredi': {
      '08:00 - 09:00': { matiere: 'Mathématiques', salle: 'A101', enseignant: 'M. Dupont' },
      '09:00 - 10:00': { matiere: 'Physique', salle: 'Lab1', enseignant: 'M. Durand' },
      '10:15 - 11:15': { matiere: 'Chimie', salle: 'Lab2', enseignant: 'Mme Bernard' },
      '11:15 - 12:15': { matiere: 'Informatique', salle: 'Info1', enseignant: 'M. Simon' },
      '14:00 - 15:00': { matiere: 'Anglais', salle: 'B201', enseignant: 'Mme Johnson' },
      '15:00 - 16:00': { matiere: 'Éducation civique', salle: 'C301', enseignant: 'M. Petit' }
    },
    'Jeudi': {
      '08:00 - 09:00': { matiere: 'Français', salle: 'B205', enseignant: 'Mme Martin' },
      '09:00 - 10:00': { matiere: 'Mathématiques', salle: 'A101', enseignant: 'M. Dupont' },
      '10:15 - 11:15': { matiere: 'Biologie', salle: 'Lab3', enseignant: 'M. Moreau' },
      '11:15 - 12:15': { matiere: 'Histoire', salle: 'C301', enseignant: 'M. Petit' },
      '14:00 - 15:00': { matiere: 'Géographie', salle: 'C301', enseignant: 'Mme Dubois' },
      '15:00 - 16:00': { matiere: 'EPS', salle: 'Gymnase', enseignant: 'M. Laurent' }
    },
    'Vendredi': {
      '08:00 - 09:00': { matiere: 'Physique', salle: 'Lab1', enseignant: 'M. Durand' },
      '09:00 - 10:00': { matiere: 'Chimie', salle: 'Lab2', enseignant: 'Mme Bernard' },
      '10:15 - 11:15': { matiere: 'Mathématiques', salle: 'A101', enseignant: 'M. Dupont' },
      '11:15 - 12:15': { matiere: 'Anglais', salle: 'B201', enseignant: 'Mme Johnson' },
      '14:00 - 15:00': { matiere: 'Informatique', salle: 'Info1', enseignant: 'M. Simon' },
      '15:00 - 16:00': { matiere: 'Philosophie', salle: 'D401', enseignant: 'M. Rousseau' }
    }
  }

  return (
    <div>
      <h2 className="mb-4">Emploi du temps</h2>

      <Card>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Heure</th>
                {JOURS_SEMAINE.map((jour) => (
                  <th key={jour}>{jour}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HEURES_COURS.map((heure) => (
                <tr key={heure}>
                  <td className="fw-bold">{heure}</td>
                  {JOURS_SEMAINE.map((jour) => {
                    const cours = emploiDuTemps[jour]?.[heure]
                    return (
                      <td key={`${jour}-${heure}`}>
                        {cours ? (
                          <div>
                            <strong>{cours.matiere}</strong>
                            <br />
                            <small className="text-muted">{cours.salle}</small>
                            <br />
                            <small className="text-muted">{cours.enseignant}</small>
                          </div>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default EmploiDuTemps

