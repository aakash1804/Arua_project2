import http.server
import socketserver
import os
import sys

PORT = 5000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"=== AURA PREMIUM RESTAURANT BOOKING SYSTEM ===")
            print(f"Server successfully launched on http://localhost:{PORT}")
            print(f"Directory: {DIRECTORY}")
            sys.stdout.flush()
            httpd.serve_forever()
    except OSError as e:
        print(f"Port {PORT} busy, retrying on 5001: {e}")
        with socketserver.TCPServer(("", 5001), Handler) as httpd:
            print(f"Server successfully launched on http://localhost:5001")
            sys.stdout.flush()
            httpd.serve_forever()

if __name__ == '__main__':
    run_server()

