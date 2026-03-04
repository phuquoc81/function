// ── function — Future Error Prediction System ─────────────────────────────
// Built by Phu Quoc Nguyen  ·  Powered by Quantum ZX Core + Copilot GPT5.5

'use strict';

// ── Error Prediction Database ─────────────────────────────────────────────
// Template library used to generate realistic predicted errors per target type.

const ERROR_TEMPLATES = {
    website: [
        { title: 'SSL Certificate Expiry', sev: 'critical', type: 'Security',    etaDays: [3, 14]  },
        { title: 'Broken Internal Links (404)', sev: 'medium', type: 'UX',        etaDays: [1, 7]   },
        { title: 'Mixed Content Warning',  sev: 'high',   type: 'Security',    etaDays: [5, 20]  },
        { title: 'DNS Propagation Delay',  sev: 'medium', type: 'Infra',       etaDays: [1, 4]   },
        { title: 'Missing Alt Text on Images', sev: 'low', type: 'Accessibility', etaDays: [7, 30] },
        { title: 'Unoptimised Images (>2 MB)', sev: 'medium', type: 'Performance', etaDays: [2, 10] },
        { title: 'JavaScript Runtime Exception', sev: 'critical', type: 'Code', etaDays: [1, 5]  },
        { title: 'Cookie Consent GDPR Failure', sev: 'high', type: 'Legal',    etaDays: [2, 8]   },
        { title: 'Slow TTFB (>2 s)',        sev: 'medium', type: 'Performance', etaDays: [3, 12]  },
        { title: 'Outdated CMS Plugin',    sev: 'high',   type: 'Security',    etaDays: [1, 6]   },
    ],
    webapp: [
        { title: 'Null Pointer Exception on Login', sev: 'critical', type: 'Code', etaDays: [1, 3] },
        { title: 'Session Token Expiry Misconfiguration', sev: 'high', type: 'Security', etaDays: [2, 10] },
        { title: 'API Rate-Limit Exceeded',  sev: 'high',   type: 'Infra',    etaDays: [1, 5]   },
        { title: 'Race Condition in State Update', sev: 'critical', type: 'Code', etaDays: [2, 7] },
        { title: 'Unhandled Promise Rejection', sev: 'medium', type: 'Code',   etaDays: [1, 4]   },
        { title: 'Memory Leak in React Component', sev: 'high', type: 'Performance', etaDays: [3, 14] },
        { title: 'SQL Injection Vulnerability', sev: 'critical', type: 'Security', etaDays: [1, 3] },
        { title: 'CORS Policy Misconfiguration', sev: 'high', type: 'Security', etaDays: [1, 6]  },
        { title: 'Infinite Re-render Loop',  sev: 'medium', type: 'Code',      etaDays: [2, 8]   },
        { title: 'Stale Cache Serving Old UI', sev: 'medium', type: 'Infra',   etaDays: [1, 4]   },
    ],
    app: [
        { title: 'Crash on Startup (iOS 17.4+)', sev: 'critical', type: 'Compatibility', etaDays: [1, 5] },
        { title: 'Excessive Battery Drain',  sev: 'high',   type: 'Performance', etaDays: [2, 10]  },
        { title: 'Push Notification Delivery Failure', sev: 'high', type: 'Infra', etaDays: [1, 4] },
        { title: 'Deprecated API Usage',    sev: 'medium', type: 'Code',       etaDays: [7, 30]  },
        { title: 'Data Race in Background Thread', sev: 'critical', type: 'Code', etaDays: [2, 6] },
        { title: 'In-App Purchase Validation Bug', sev: 'critical', type: 'Business', etaDays: [1, 3] },
        { title: 'Incorrect Permissions Request', sev: 'medium', type: 'Privacy', etaDays: [5, 15] },
        { title: 'UI Layout Break on Tablet', sev: 'low',   type: 'UX',        etaDays: [3, 14]  },
        { title: 'Keychain Storage Leak',   sev: 'high',   type: 'Security',   etaDays: [2, 8]   },
        { title: 'Analytics SDK Crash',     sev: 'medium', type: 'Stability',  etaDays: [1, 5]   },
    ],
    game: [
        { title: 'Save-File Corruption on Level 7', sev: 'critical', type: 'Data', etaDays: [1, 4] },
        { title: 'Anti-Cheat False Positive',  sev: 'high',   type: 'Gameplay', etaDays: [2, 8]  },
        { title: 'Physics Engine Desync (Multiplayer)', sev: 'critical', type: 'Netcode', etaDays: [1, 5] },
        { title: 'Memory Overflow on Map Load', sev: 'high', type: 'Performance', etaDays: [2, 7] },
        { title: 'Shader Compilation Crash (AMD GPU)', sev: 'critical', type: 'Graphics', etaDays: [1, 3] },
        { title: 'Infinite Respawn Loop',   sev: 'medium', type: 'Gameplay',   etaDays: [1, 6]   },
        { title: 'Leaderboard Score Manipulation', sev: 'high', type: 'Security', etaDays: [2, 8] },
        { title: 'Voice Chat Echo / Feedback', sev: 'medium', type: 'Audio',   etaDays: [3, 10]  },
        { title: 'Controller Deadzone Miscalibration', sev: 'low', type: 'Input', etaDays: [5, 20] },
        { title: 'DLC Entitlement Validation Failure', sev: 'critical', type: 'Business', etaDays: [1, 4] },
    ],
};

// ── Quantum ZX Core Particle System ─────────────────────────────────────────

class QuantumZXCore {
    constructor(canvas) {
        this.canvas  = canvas;
        this.ctx     = canvas.getContext('2d');
        this.w       = canvas.width;
        this.h       = canvas.height;
        this.particles = [];
        this.connections = [];
        this.frame   = 0;
        this.active  = true;
        this.states  = ['Superposition', 'Entangled', 'Coherent', 'Optimized', 'Collapsed'];
        this.stateIdx = 0;
        this._stateTimer = 0;

        this._initParticles();
        this._loop();
    }

    _initParticles() {
        const count = 28;
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x:   Math.random() * this.w,
                y:   Math.random() * this.h,
                vx:  (Math.random() - 0.5) * 0.6,
                vy:  (Math.random() - 0.5) * 0.6,
                r:   Math.random() * 2.5 + 1,
                hue: Math.random() * 60 + 180,   // cyan-purple range
                phase: Math.random() * Math.PI * 2,
            });
        }
    }

    _loop() {
        if (!this.active) return;
        this._update();
        this._draw();
        requestAnimationFrame(() => this._loop());
    }

    _update() {
        this.frame++;
        this._stateTimer++;
        if (this._stateTimer > 150) {
            this._stateTimer = 0;
            this.stateIdx = (this.stateIdx + 1) % this.states.length;
            const el = document.getElementById('qzxState');
            if (el) el.textContent = this.states[this.stateIdx];
        }

        // Update entanglement display
        if (this.frame % 40 === 0) {
            const entEl = document.getElementById('qzxEnt');
            if (entEl) entEl.textContent = (75 + Math.floor(Math.random() * 15)) + '%';
        }

        for (const p of this.particles) {
            p.x += p.vx;
            p.y += p.vy;
            p.phase += 0.03;
            if (p.x < 0 || p.x > this.w) p.vx *= -1;
            if (p.y < 0 || p.y > this.h) p.vy *= -1;
        }
    }

    _draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.w, this.h);

        // Draw connection lines
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const a = this.particles[i];
                const b = this.particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 80) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(0,195,255,${0.18 * (1 - dist / 80)})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        for (const p of this.particles) {
            const alpha = 0.6 + 0.4 * Math.sin(p.phase);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${alpha})`;
            ctx.fill();

            // Glow
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
            grad.addColorStop(0, `hsla(${p.hue}, 90%, 65%, ${alpha * 0.25})`);
            grad.addColorStop(1, 'transparent');
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
        }

        // Scan-line sweep when running
        if (this._scanning) {
            const x = ((this.frame * 3) % this.w);
            const sweepGrad = ctx.createLinearGradient(x - 20, 0, x + 20, 0);
            sweepGrad.addColorStop(0, 'transparent');
            sweepGrad.addColorStop(0.5, 'rgba(0,195,255,0.35)');
            sweepGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = sweepGrad;
            ctx.fillRect(x - 20, 0, 40, this.h);
        }
    }

    startScan()  { this._scanning = true; }
    stopScan()   { this._scanning = false; }
    destroy()    { this.active = false; }
}

// ── Main Application ──────────────────────────────────────────────────────

class FunctionApp {
    constructor() {
        this.targetType   = 'website';
        this.predictions  = [];
        this.selectedIds  = new Set();
        this.scanning     = false;
        this._toastTimer  = null;
        this._pendingDispatch = null;

        this.qzx = new QuantumZXCore(document.getElementById('qzxCanvas'));

        this._bindEvents();
        this._setQZXStatus('online', 'Quantum ZX Core — Online');
        this._log('System initialised. Copilot GPT5.5 engine ready.', 'system');
        this._log('Phuoptimizer 81 connected. Phu AI standing by.', 'system');
    }

    // ── Event Binding ─────────────────────────────────────────────────────

    _bindEvents() {
        // Type selector
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.targetType = btn.dataset.type;
            });
        });

        // Optimization level label
        const optSlider = document.getElementById('optLevel');
        optSlider.addEventListener('input', () => {
            document.getElementById('optLevelVal').textContent = optSlider.value;
        });

        // Scan button
        document.getElementById('scanBtn').addEventListener('click', () => this._startScan());

        // Enter key in input
        document.getElementById('targetInput').addEventListener('keydown', e => {
            if (e.key === 'Enter') this._startScan();
        });

        // Dispatch buttons
        document.getElementById('dispatchPhuAI').addEventListener('click', () =>
            this._openDispatch('phuai', 'Phu AI', '🧠'));
        document.getElementById('dispatchOpt81').addEventListener('click', () =>
            this._openDispatch('opt81', 'Phuoptimizer 81', '⚙️'));
        document.getElementById('dispatchBlog').addEventListener('click', () =>
            this._openDispatch('blog', 'pubers.blog', '📝'));

        // Modal confirm / cancel
        document.getElementById('dispatchConfirmBtn').addEventListener('click', () => this._confirmDispatch());
        document.getElementById('dispatchCancelBtn').addEventListener('click', () => this._closeModal());
    }

    // ── Scan Logic ────────────────────────────────────────────────────────

    _startScan() {
        if (this.scanning) return;

        const raw = document.getElementById('targetInput').value.trim();
        const errEl = document.getElementById('scanError');

        if (!raw) {
            errEl.classList.remove('hidden');
            document.getElementById('targetInput').focus();
            return;
        }
        errEl.classList.add('hidden');

        this.scanning = true;
        this.selectedIds.clear();
        this.predictions = [];

        const btn = document.getElementById('scanBtn');
        btn.disabled = true;
        document.getElementById('scanBtnLabel').innerHTML =
            '<span class="spinner"></span> Scanning…';
        btn.classList.add('scanning');
        this.qzx.startScan();
        this._setQZXStatus('working', 'Quantum ZX Core — Scanning…');

        this._log(`Scan initiated → [${this.targetType.toUpperCase()}] ${this._sanitise(raw)}`, 'scan');

        // Simulate async quantum processing delay (1.8 – 3.2 s)
        const delay = 1800 + Math.random() * 1400;
        setTimeout(() => this._completeScan(raw), delay);
    }

    _completeScan(target) {
        const templates = ERROR_TEMPLATES[this.targetType] || ERROR_TEMPLATES.website;
        const optLevel  = parseInt(document.getElementById('optLevel').value);
        const qboost    = document.getElementById('qboost').checked;

        // Select 3–7 errors based on opt level and quantum boost
        const baseCount = 3 + Math.floor((optLevel / 81) * 4);
        const count     = Math.min(templates.length, baseCount + (qboost ? 1 : 0));

        // Shuffle and pick
        const shuffled = [...templates].sort(() => Math.random() - 0.5);
        this.predictions = shuffled.slice(0, count).map((tpl, i) => ({
            id:         i,
            title:      tpl.title,
            sev:        tpl.sev,
            type:       tpl.type,
            confidence: 72 + Math.floor(Math.random() * 27),   // 72–98%
            eta:        this._randomEta(tpl.etaDays),
            target:     this._sanitise(target),
        }));

        this._renderResults();

        // Reset scan UI
        this.scanning = false;
        const btn = document.getElementById('scanBtn');
        btn.disabled = false;
        document.getElementById('scanBtnLabel').textContent = '⚡ Predict Future Errors';
        btn.classList.remove('scanning');
        this.qzx.stopScan();
        this._setQZXStatus('online', 'Quantum ZX Core — Online');

        this._log(`Scan complete. ${this.predictions.length} future errors predicted for "${this._sanitise(target)}".`, 'success');

        const criticals = this.predictions.filter(p => p.sev === 'critical').length;
        if (criticals > 0) {
            this._log(`⚠ ${criticals} CRITICAL error(s) detected — dispatch recommended.`, 'error');
        }

        this._toast(`${this.predictions.length} errors predicted · ${criticals} critical`);
    }

    // ── Rendering ─────────────────────────────────────────────────────────

    _renderResults() {
        const body    = document.getElementById('resultsBody');
        const countEl = document.getElementById('resultCount');
        body.innerHTML = '';

        if (this.predictions.length === 0) {
            body.innerHTML = '<p class="results-placeholder">No errors predicted.</p>';
            countEl.classList.add('hidden');
            this._updateDispatchButtons();
            return;
        }

        countEl.textContent = this.predictions.length;
        countEl.classList.remove('hidden');

        // Select-all row
        const selAll = document.createElement('label');
        selAll.className = 'select-all-row';
        const chkAll = document.createElement('input');
        chkAll.type = 'checkbox';
        chkAll.id  = 'selectAll';
        chkAll.addEventListener('change', () => {
            this.predictions.forEach(p => {
                if (chkAll.checked) {
                    this.selectedIds.add(p.id);
                } else {
                    this.selectedIds.delete(p.id);
                }
            });
            document.querySelectorAll('.error-card').forEach(card => {
                card.classList.toggle('selected', chkAll.checked);
            });
            this._updateDispatchButtons();
        });
        selAll.appendChild(chkAll);
        selAll.appendChild(document.createTextNode(' Select all errors for dispatch'));
        body.appendChild(selAll);

        // Error cards
        const order = { critical: 0, high: 1, medium: 2, low: 3 };
        const sorted = [...this.predictions].sort((a, b) => order[a.sev] - order[b.sev]);

        sorted.forEach(pred => {
            const card = document.createElement('div');
            card.className = `error-card sev-${pred.sev}`;
            card.dataset.id = pred.id;

            card.innerHTML = `
                <div class="error-card-header">
                    <span class="error-sev-badge">${pred.sev}</span>
                    <span class="error-title">${this._sanitise(pred.title)}</span>
                </div>
                <div class="error-card-meta">
                    <span>📂 ${this._sanitise(pred.type)}</span>
                    <span class="error-eta">⏳ ~${this._sanitise(pred.eta)}</span>
                    <span>🎯 ${pred.confidence}% confidence</span>
                </div>
                <div class="confidence-bar-wrap">
                    <div class="confidence-bar" style="width:${pred.confidence}%"></div>
                </div>
            `;

            card.addEventListener('click', () => this._toggleSelect(pred.id, card));
            body.appendChild(card);
        });

        this._updateDispatchButtons();
    }

    _toggleSelect(id, card) {
        if (this.selectedIds.has(id)) {
            this.selectedIds.delete(id);
            card.classList.remove('selected');
        } else {
            this.selectedIds.add(id);
            card.classList.add('selected');
        }
        this._updateDispatchButtons();

        const selAll = document.getElementById('selectAll');
        if (selAll) {
            selAll.checked = this.selectedIds.size === this.predictions.length;
            selAll.indeterminate = this.selectedIds.size > 0 && this.selectedIds.size < this.predictions.length;
        }
    }

    _updateDispatchButtons() {
        const hasSelection = this.selectedIds.size > 0;
        document.getElementById('dispatchPhuAI').disabled  = !hasSelection;
        document.getElementById('dispatchOpt81').disabled  = !hasSelection;
        document.getElementById('dispatchBlog').disabled   = !hasSelection;

        const hint = document.getElementById('dispatchHint');
        if (this.predictions.length === 0) {
            hint.textContent = 'Complete a scan first, then select errors to dispatch.';
        } else if (!hasSelection) {
            hint.textContent = `Select one or more errors above to enable dispatch (${this.predictions.length} available).`;
        } else {
            hint.textContent = `${this.selectedIds.size} error(s) selected · Ready to dispatch.`;
        }
    }

    // ── Dispatch ──────────────────────────────────────────────────────────

    _openDispatch(agent, label, icon) {
        if (this.selectedIds.size === 0) return;
        this._pendingDispatch = { agent, label, icon };

        const selErrors = this.predictions.filter(p => this.selectedIds.has(p.id));
        const names = selErrors.map(p => `• [${p.sev.toUpperCase()}] ${p.title}`).join('\n');

        document.getElementById('dispatchModalBody').textContent =
            `Send ${this.selectedIds.size} error(s) to ${icon} ${label} for automated resolution?\n\n${names}`;
        document.getElementById('dispatchModal').classList.remove('hidden');
    }

    _confirmDispatch() {
        const { agent, label, icon } = this._pendingDispatch;
        this._closeModal();

        const selErrors = this.predictions.filter(p => this.selectedIds.has(p.id));
        const target    = selErrors[0]?.target || 'unknown';

        this._log(`Dispatching ${selErrors.length} fix request(s) → ${icon} ${label} via Quantum ZX Core…`, 'dispatch');
        this._setQZXStatus('working', `Quantum ZX Core — Dispatching to ${label}…`);

        // Simulate network round-trip (1–2 s)
        setTimeout(() => {
            selErrors.forEach(p => {
                this._log(`✓ [${p.sev.toUpperCase()}] "${p.title}" → ${label} · fix queued.`, 'success');
            });
            const protocol = document.getElementById('qzxProto').textContent;
            this._log(`${icon} ${label} acknowledged ${selErrors.length} task(s) · Protocol: ${protocol} · Engine: Copilot GPT5.5`, 'success');
            this._setQZXStatus('online', 'Quantum ZX Core — Online');
            this._toast(`${selErrors.length} fix(es) dispatched to ${label} ✓`);

            // Optionally open the external destination in a new tab
            if (agent === 'blog') {
                window.open('https://pubers.blog', '_blank', 'noopener,noreferrer');
            }
        }, 1000 + Math.random() * 1000);
    }

    _closeModal() {
        document.getElementById('dispatchModal').classList.add('hidden');
        this._pendingDispatch = null;
    }

    // ── Helpers ───────────────────────────────────────────────────────────

    _sanitise(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    _randomEta([minDays, maxDays]) {
        const days = minDays + Math.floor(Math.random() * (maxDays - minDays + 1));
        if (days === 1) return '1 day';
        if (days < 7)  return `${days} days`;
        const weeks = Math.round(days / 7);
        return `${weeks} week${weeks > 1 ? 's' : ''}`;
    }

    _log(msg, cls = 'system') {
        const log  = document.getElementById('activityLog');
        const ts   = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const entry = document.createElement('div');
        entry.className = `log-entry log-${cls}`;
        // Use textContent to avoid XSS from user-supplied strings inside log messages
        entry.textContent = `[${ts}] ${msg}`;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;
    }

    _toast(msg) {
        const el = document.getElementById('toast');
        el.textContent = msg;
        el.classList.add('show');
        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
    }

    _setQZXStatus(cls, label) {
        const dot  = document.getElementById('qzxDot');
        const lbl  = document.getElementById('qzxLabel');
        dot.className  = `status-dot ${cls}`;
        lbl.textContent = label;
    }
}

// ── Boot ──────────────────────────────────────────────────────────────────

window.addEventListener('DOMContentLoaded', () => { new FunctionApp(); });
