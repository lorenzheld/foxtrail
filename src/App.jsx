import { useState } from 'react'
import './App.css'

function App() {
    const [inputValue, setInputValue] = useState('')
    const [showMap, setShowMap] = useState(false)

    const handleCheck = () => {
        console.log('Prüfen:', inputValue)
        if (inputValue.trim()) {
            alert(`Code geprüft: ${inputValue}`)
        }
    }

    const toggleMap = () => {
        setShowMap(!showMap)
    }

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
                    <div className="input-container">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Code eingeben"
                            className="code-input"
                        />
                    </div>
                </div>
            </main>

            {/* Footer mit Button */}
            <footer className="footer">
                <button
                    onClick={handleCheck}
                    className="check-button"
                    disabled={!inputValue.trim()}
                >
                    Prüfen
                </button>
            </footer>

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
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#1976d2"/>
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