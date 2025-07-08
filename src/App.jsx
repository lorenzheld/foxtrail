import { useState } from 'react'
import './App.css'

function App() {
    const [inputValue, setInputValue] = useState('')
    const [showMap, setShowMap] = useState(false)
    const [currentStage, setCurrentStage] = useState(0)
    const [feedback, setFeedback] = useState('')

    // Definiere die Stages mit Text und Lösungswort
    const stages = [
        {
            text: "Willkommen zum Foxtrail! Finde das erste Lösungswort. " + "\n" +
                "Gehe zum Digitec-Store an die Türe. Was steht unter GALAXUS? (erstes Wort ohne Sonderzeichen alles kleingeschrieben)",
            solution: "pickup", // Erstes Lösungswort
            placeholder: "Erstes Lösungswort eingeben"
        },
        {
            text: "Gut gemacht! Gehe jetzt zum SKILLSPARK, am Eingang ca 15m vorbei. Dort sagt die Wasserrinne etwas.",
            solution: "blubb", // Zweites Lösungswort
            placeholder: "Was sagt sie?"
        },
        {
            text: "Exzellent! Mach dich auf den Weg über die Brücke zur Freien Schule Winterthur. Auf der Wand vom Veloständer ist das Codewort.",
            solution: "freischi", // Drittes Lösungswort
            placeholder: "Drittes Lösungswort eingeben"
        },
        {
            text: "Super! Begebe dich jetzt zur Heiligbergstr. 25. Bitte die Zeitungen in den ___________ legen",
            solution: "milchkasten",
            placeholder: "Viertes Lösungswort eingeben"
        },
        {
            text: "Wahnsinn wie gut du bist. Gehe jetzt Richtung KBW. Was steht auf der Brücke, wenn du in die Rosenstrasse einbiegst?",
            solution: "aspasia ag",
            placeholder: "Fünftes Lösungswort eingeben"
        },
        {
            text: "Gehe jetzt in das A-Gebäude der KBW. Such das Schild vom Pendel. Mit was ist der Schalter gesteuert?",
            solution: "quecksilber",
            placeholder: "Sechstes Lösungswort eingeben"
        },
        {
            text: "Gehe jetzt zum besten Dönerladen der Stadt (Zermatt). Wie viele Treppenstufen sind es bis du deine Blase entleeren kannst?",
            solution: "14",
            placeholder: "Siebtes Lösungswort eingeben"
        },
        {
            text: "Nach diesem feinen Döner musst du deine Zähne putzen. Gehe zur Zahnbürste im Stadtpark. Wie viele Borsten hat diese?",
            solution: "20",
            placeholder: "Achtes Lösungswort eingeben"
        },
        {
            text: "Geh jetzt zum HB auf das Dach zu den Parkplätzen. Von welcher Marke ist die Uhr?",
            solution: "hutter dynamics ag",
            placeholder: "Neuntes Lösungswort eingeben"
        },
        {
            text: "Fantastisch! Du hast alle Rätsel gelöst! Der Foxtrail ist beendet. Begebe dich zurück an die BBW",
            solution: null, // Kein weiteres Lösungswort
            placeholder: "Foxtrail beendet"
        }
    ]

    const handleCheck = () => {
        console.log('Prüfen:', inputValue)

        const currentSolution = stages[currentStage].solution

        if (inputValue.trim().toLowerCase() === currentSolution) {
            // Richtiges Lösungswort - zur nächsten Stage
            setFeedback('Richtig! Weiter zur nächsten Aufgabe.')
            setTimeout(() => {
                setCurrentStage(currentStage + 1)
                setInputValue('')
                setFeedback('')
            }, 1500)
        } else if (inputValue.trim()) {
            // Falsches Lösungswort
            setFeedback('Das ist nicht das richtige Lösungswort. Versuche es nochmal!')
            setTimeout(() => {
                setFeedback('')
            }, 3000)
        }
    }

    const toggleMap = () => {
        setShowMap(!showMap)
    }

    const isLastStage = currentStage >= stages.length - 1
    const currentStageData = stages[currentStage] || stages[stages.length - 1]

    return (
        <div className="app">
            {/* Header */}
            <header className="header">
                <button className="map-button" onClick={toggleMap} aria-label="Karte anzeigen">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 19V5h6v14H5zm14 0h-6V5h6v14z" fill="currentColor"/>
                    </svg>
                </button>
                <h1 className="app-title">Foxtrail</h1>
                <div className="spacer"></div>
            </header>

            {/* Hauptinhalt */}
            <main className="main-content">
                <div className="content-container">
                    {/* Stage-Indikator */}
                    <div className="stage-indicator">
                        <span className="stage-text">
                            {isLastStage ? 'Beendet!' : `Aufgabe ${currentStage + 1} von ${stages.length - 1}`}
                        </span>
                    </div>

                    {/* Aufgabentext */}
                    <div className="task-text">
                        <p>{currentStageData.text}</p>
                    </div>

                    {/* Feedback-Nachricht */}
                    {feedback && (
                        <div className={`feedback ${feedback.includes('Richtig') ? 'feedback-success' : 'feedback-error'}`}>
                            {feedback}
                        </div>
                    )}

                    {/* Input nur anzeigen wenn nicht beendet */}
                    {!isLastStage && (
                        <div className="input-container">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={currentStageData.placeholder}
                                className="code-input"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleCheck()
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>
            </main>

            {/* Footer mit Button - nur wenn nicht beendet */}
            {!isLastStage && (
                <footer className="footer">
                    <button
                        onClick={handleCheck}
                        className="check-button"
                        disabled={!inputValue.trim()}
                    >
                        Prüfen
                    </button>
                </footer>
            )}

            {/* Karten-Overlay */}
            {showMap && (
                <div className="map-overlay" onClick={toggleMap}>
                    <div className="map-container" onClick={(e) => e.stopPropagation()}>
                        <div className="map-header">
                            <h2>Karte</h2>
                            <button className="close-button" onClick={toggleMap}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                                </svg>
                            </button>
                        </div>
                        <div className="map-content">
                            <div className="map-placeholder">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                                </svg>
                                <p>Karte wird hier angezeigt</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App