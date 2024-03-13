from flask import Flask, render_template, request, send_file
import qrcode

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_qrcode')
def generate_qrcode():
    url = request.args.get('url')
    img = qrcode.make(url)
    img_io = img.get_image()
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
