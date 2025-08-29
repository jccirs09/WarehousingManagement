document.addEventListener('DOMContentLoaded', function() {
    if (typeof pickingListData === 'undefined') {
        console.error("Picking list data not found.");
        return;
    }

    function renderHeader(data) {
        document.getElementById('pl-number').textContent = `No. ${data.number}`;
        const detailsContainer = document.getElementById('pl-header-details');

        const details = {
            "BUYER": data.buyer, "SHIP DATE": data.shipDate,
            "Tel": data.tel, "ORDER DATE": data.orderDate,
            "SALES REP": data.salesRep, "SHIP VIA": data.shipVia,
            "MILL CERTS": data.millCerts, "TERMS": data.terms
        };

        let detailsHTML = '';
        for (const [key, value] of Object.entries(details)) {
            detailsHTML += `<div class="detail-item"><strong>${key}</strong><span>${value || ''}</span></div>`;
        }
        detailsContainer.innerHTML = detailsHTML;
    }

    function renderAddresses(data) {
        const soldToContainer = document.getElementById('pl-sold-to');
        soldToContainer.innerHTML = `
            <div class="address-block">
                <h4>SOLD TO</h4>
                <p>${data.soldTo.name}<br>${data.soldTo.address1}<br>${data.soldTo.address2}</p>
            </div>`;

        const shipToContainer = document.getElementById('pl-ship-to');
        shipToContainer.innerHTML = `
            <div class="address-block">
                <h4>SHIP TO</h4>
                <p>${data.shipTo.name}<br>${data.shipTo.address1}<br>${data.shipTo.address2}</p>
            </div>`;
    }

    function renderNotes(data) {
        const notesContainer = document.getElementById('pl-general-notes');
        let notesHTML = '';
        data.generalNotes.forEach(note => {
            notesHTML += `<li>${note}</li>`;
        });
        notesContainer.innerHTML = notesHTML;
    }

    function renderDescription(descriptionData) {
        const container = document.createElement('div');
        descriptionData.forEach(item => {
            const el = document.createElement('div');
            el.classList.add('desc-item');
            switch (item.type) {
                case 'text':
                    el.textContent = item.data;
                    break;
                case 'kv':
                    el.classList.add('kv');
                    el.innerHTML = `<strong>${item.key}:</strong> <span>${item.value}</span>`;
                    break;
                case 'table':
                    el.classList.add('table-container');
                    let tableHTML = '<table><thead><tr>';
                    item.headers.forEach(h => tableHTML += `<th>${h}</th>`);
                    tableHTML += '</tr></thead><tbody>';
                    item.rows.forEach(row => {
                        tableHTML += '<tr>';
                        row.forEach(cell => tableHTML += `<td>${cell}</td>`);
                        tableHTML += '</tr>';
                    });
                    tableHTML += '</tbody></table>';
                    el.innerHTML = tableHTML;
                    break;
            }
            container.appendChild(el);
        });
        return container;
    }

    function renderLineItems(items) {
        const tbody = document.getElementById('pl-items-body');
        tbody.innerHTML = ''; // Clear existing
        items.forEach(item => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.line}</td>
                <td>${item.quantity}</td>
                <td>${item.qtyStaged}</td>
                <td class="description-col"></td>
                <td>${item.width}</td>
                <td>${item.length}</td>
                <td>${item.weight}</td>
            `;

            row.querySelector('.description-col').appendChild(renderDescription(item.description));
            tbody.appendChild(row);
        });
    }

    function renderFooter(data) {
        const footerContainer = document.getElementById('pl-total-weight');
        footerContainer.innerHTML = `<strong>TOTAL WT:</strong> ${data.totalWeight}`;
    }

    function renderPickingList(data) {
        renderHeader(data);
        renderAddresses(data);
        renderNotes(data);
        renderLineItems(data.lineItems);
        renderFooter(data);
    }

    renderPickingList(pickingListData);
});
