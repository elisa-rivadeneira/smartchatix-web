from pytube import YouTube
import ffmpeg

# URL del video
url = "https://www.youtube.com/watch?v=5_4KRUx2iKY"

# Descargar solo audio
yt = YouTube(url)
audio_stream = yt.streams.filter(only_audio=True).first()
audio_file = audio_stream.download(filename="audio.mp4")

# Extraer solo los primeros 90 segundos
output_file = "audio_90s.mp3"
(
    ffmpeg
    .input(audio_file, t=90)  # t=90 segundos
    .output(output_file)
    .run()
)

print("✅ Audio de 90 segundos guardado en:", output_file)
