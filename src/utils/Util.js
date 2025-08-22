const Util = {
    initShader(gl, vertexSource, fragmentSource) {
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)
        gl.shaderSource(vertexShader, vertexSource)
        gl.compileShader(vertexShader)
        const isVertexSuccess = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)
        if (!isVertexSuccess) {
            console.warn("编译顶点着色器失败")
            return false
        }
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(fragmentShader, fragmentSource)
        gl.compileShader(fragmentShader)
        const isFragmentSuccess = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)
        if (!isFragmentSuccess) {
            console.warn("编译片元着色器失败")
            return false
        }
        const program = gl.createProgram()
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)
        gl.useProgram(program)
        const isLinkSuccess = gl.getProgramParameter(program, gl.LINK_STATUS)
        if (!isLinkSuccess) {
            console.warn("连接程序失败")
            return false
        }
        gl.program = program
        return true
    },
    Poly: class Poly {
        constructor(options) {
            Object.assign(this, this._defaultAttr(), options)
            this.init()
        }
        _defaultAttr () {
            return {
                gl : null,
                vertices : [],
                geoData : [],
                size : 2,
                attrName : "a_Position",
                count : 0,
                types : ['POINTS']
            }
        }
        init() {
            const {attrName , size, gl} = this
            if(!gl) return
            const buffer = gl.createBuffer()
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
            this.updateBuffer()
            const a_Position = gl.getActiveAttrib(gl.program, attrName)
            gl.vertexAttribPointer(a_Position, size, gl.FLOAT, false, 0, 0)
            gl.enableVertexAttribArray(a_Position)
        }
        addVertice(...params) {
            this.vertices.push(...params)
            this.updateBuffer()
        }
        popVertice() {
            const {vertices , size} = this
            const length = vertices.length
            vertices.splice(length - size,  length)
            this.updateCount()
        }
        setVertice(index, ...params) {
            const {vertices , size} = this
            for(let i = index ; i < index + size ; i++) {
                vertices[i] = params[i]
            }
        }
        updateBuffer() {
            const {gl , vertices} = this
            this.updateCount()
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
        }
        updateCount() {
            this.count = this.vertices.length / this.size
        }
        updateVertices() {

        }
        draw(types = this.types) {
            const {gl , count} = this
            for(let type of types) {
                gl.drawArrays(gl[type], 0, count)
            }
        }
    },
    getMousePosInWebgl(event, canvas) {
        const {width , height} = canvas.getBoundingClientRect()
        const {offsetX , offsetY} = event
        const x =  (offsetX - width / 2) / (width / 2)
        const y =  (height / 2 - offsetY) / (height / 2)
        return {x, y}
    },
    getRandomColor(a = true) {
        const r = Math.random()
        const g = Math.random()
        const b = Math.random()
        return [r, g, b, a ? 1.0 :Math.random()]
    }
}

export default Util