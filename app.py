from flask import Flask, render_template, request, send_file, session
import qrcode
from io import BytesIO

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_qrcode')
def generate_qrcode():
    url = request.args.get('url')
    img = qrcode.make(url)
    img_bytes = BytesIO()
    img.save(img_bytes, format='PNG')
    img_bytes.seek(0)
    session['qrcode_img'] = img_bytes.getvalue()
    return send_file(img_bytes, mimetype='image/png')

@app.route('/download_qrcode')
def download_qrcode():
    img_bytes = BytesIO(session['qrcode_img'])
    img_bytes.seek(0)
    return send_file(img_bytes, mimetype='image/png', as_attachment=True, attachment_filename='qrcode.png')

if __name__ == '__main__':
    app.run(debug=True)
