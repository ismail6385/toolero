'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faMicrophone, faStop, faPlay, faDownload, faCircle } from '@fortawesome/free-solid-svg-icons';

export default function ScreenRecorderClient() {
    const [isRecording, setIsRecording] = useState(false);
    const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [includeMic, setIncludeMic] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startRecording = async () => {
        try {
            // Get screen stream
            const displayStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true // System audio
            });

            let combinedStream = displayStream;

            // If mic requested, get mic stream and mix
            if (includeMic) {
                const audioStream = await navigator.mediaDevices.getUserMedia({
                    audio: true
                });

                // Mix tracks? 
                // Simple way: Add mic track to display stream if possible or use AudioContext mixer.
                // Modern browsers allow multiple audio tracks, but recording them into one file might need mixing.
                // MediaRecorder usually records the first audio track or requires mixing.
                // Let's keep it simple: Just system audio (from displayMedia) or just mic?
                // Actually, commonly user wants BOTH.

                // Mixing approach with AudioContext
                const audioContext = new AudioContext();
                const dest = audioContext.createMediaStreamDestination();

                if (displayStream.getAudioTracks().length > 0) {
                    const sysSource = audioContext.createMediaStreamSource(displayStream);
                    sysSource.connect(dest);
                }

                const micSource = audioContext.createMediaStreamSource(audioStream);
                micSource.connect(dest);

                const mixedAudioTrack = dest.stream.getAudioTracks()[0];
                const videoTrack = displayStream.getVideoTracks()[0];

                combinedStream = new MediaStream([videoTrack, mixedAudioTrack]);
            }

            const mediaRecorder = new MediaRecorder(combinedStream, {
                mimeType: 'video/webm;codecs=vp9'
            });

            mediaRecorderRef.current = mediaRecorder;
            streamRef.current = combinedStream;

            const chunks: BlobPart[] = [];
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                setRecordedBlob(blob);
                setVideoUrl(URL.createObjectURL(blob));

                // Stop all tracks
                combinedStream.getTracks().forEach(track => track.stop());
                displayStream.getTracks().forEach(track => track.stop()); // Ensure original stopped
            };

            // Handle user clicking "Stop" on browser UI
            combinedStream.getVideoTracks()[0].onended = () => {
                stopRecording();
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordedBlob(null);
            setVideoUrl(null);

        } catch (err) {
            console.error(err);
            alert('Error al iniciar la grabación. Asegúrate de dar permisos.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const downloadVideo = () => {
        if (videoUrl) {
            const a = document.createElement('a');
            a.href = videoUrl;
            a.download = `grabacion_${new Date().getTime()}.webm`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4 text-red-600">
                    <FontAwesomeIcon icon={faVideo} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Grabador de Pantalla</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Graba todo lo que ocurre en tu pantalla. Sin límites de tiempo y sin marcas de agua.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 text-center">

                {!videoUrl && !isRecording && (
                    <div className="mb-8 p-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 flex flex-col items-center justify-center">
                        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                            <FontAwesomeIcon icon={faVideo} className="text-4xl text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-text mb-2">Listo para Grabar</h3>
                        <p className="text-text/50">Haz clic en el botón para seleccionar la ventana o pantalla.</p>
                    </div>
                )}

                {/* Preview while recording? No, just status */}
                {isRecording && (
                    <div className="mb-8 p-12 bg-red-50 rounded-2xl border border-red-100 flex flex-col items-center justify-center animate-pulse">
                        <div className="flex items-center gap-3 text-red-600 mb-4">
                            <FontAwesomeIcon icon={faCircle} className="text-sm animate-ping" />
                            <span className="font-bold uppercase tracking-widest text-sm">Grabando en curso...</span>
                        </div>
                        <p className="text-text/60 text-sm">No cierres esta pestaña</p>
                    </div>
                )}

                {/* Result Preview */}
                {videoUrl && (
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-black">
                        <video src={videoUrl} controls className="w-full max-h-[500px]" />
                    </div>
                )}

                {/* Controls */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    {!isRecording && (
                        <>
                            <label className="flex items-center gap-3 cursor-pointer bg-gray-50 px-6 py-4 rounded-xl border border-gray-200 hover:border-red-200 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={includeMic}
                                    onChange={e => setIncludeMic(e.target.checked)}
                                    className="w-5 h-5 rounded text-red-600 focus:ring-red-500"
                                />
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faMicrophone} className={includeMic ? 'text-red-500' : 'text-gray-400'} />
                                    <span className="font-semibold text-text">Incluir Micrófono</span>
                                </div>
                            </label>

                            <button
                                onClick={startRecording}
                                className="px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-red-700 hover:scale-105 transition-all flex items-center gap-3"
                            >
                                <FontAwesomeIcon icon={faPlay} />
                                Iniciar Grabación
                            </button>
                        </>
                    )}

                    {isRecording && (
                        <button
                            onClick={stopRecording}
                            className="px-8 py-4 bg-gray-900 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-black hover:scale-105 transition-all flex items-center gap-3"
                        >
                            <FontAwesomeIcon icon={faStop} />
                            Detener Grabación
                        </button>
                    )}

                    {videoUrl && (
                        <button
                            onClick={downloadVideo}
                            className="px-8 py-4 bg-green-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-green-700 hover:scale-105 transition-all flex items-center gap-3"
                        >
                            <FontAwesomeIcon icon={faDownload} />
                            Descargar Video
                        </button>
                    )}
                </div>

                {videoUrl && (
                    <button
                        onClick={() => { setVideoUrl(null); setRecordedBlob(null); }}
                        className="mt-6 text-sm text-text/40 hover:text-red-500 underline"
                    >
                        Descartar y grabar nuevo
                    </button>
                )}

            </div>
        </div>
    );
}
