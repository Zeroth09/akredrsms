// Data target standar per Pokja per bulan
// Sumber: "Target Standar yang harus dipenuhi oleh POKJA tiap bulan.pdf"

export interface TargetBulan {
    bulan: string
    standar: string[]  // daftar standar yang harus dipenuhi bulan ini
}

export interface TargetPokja {
    pokja: string
    totalStandar: number
    jadwal: TargetBulan[]
}

// Bulan saat ini (1=Jan, 2=Feb, dst) — digunakan untuk highlight target aktif
export function getBulanSekarang(): number {
    return new Date().getMonth() + 1
}

export function getNamaBulan(bulan: number): string {
    const names = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    return names[bulan] ?? ''
}

export const TARGET_PER_POKJA: TargetPokja[] = [
    {
        pokja: 'TKRS', totalStandar: 17,
        jadwal: [
            { bulan: 'Januari', standar: ['Pembahasan Anggota Tim'] },
            { bulan: 'Februari', standar: ['TKRS 1', 'TKRS 2', 'TKRS 3', 'TKRS 3.1'] },
            { bulan: 'Maret', standar: ['TKRS 4', 'TKRS 5', 'TKRS 6'] },
            { bulan: 'April', standar: ['TKRS 7', 'TKRS 7.1', 'TKRS 8', 'TKRS 9'] },
            { bulan: 'Mei', standar: ['TKRS 10', 'TKRS 11', 'TKRS 12'] },
            { bulan: 'Juni', standar: ['TKRS 13', 'TKRS 14', 'TKRS 15'] },
        ]
    },
    {
        pokja: 'KPS', totalStandar: 21,
        jadwal: [
            { bulan: 'Januari', standar: ['Pembahasan Anggota Tim'] },
            { bulan: 'Februari', standar: ['KPS 1', 'KPS 2', 'KPS 3', 'KPS 4'] },
            { bulan: 'Maret', standar: ['KPS 5', 'KPS 6', 'KPS 7', 'KPS 8', 'KPS 8.1'] },
            { bulan: 'April', standar: ['KPS 9', 'KPS 10', 'KPS 10.1', 'KPS 11', 'KPS 12'] },
            { bulan: 'Mei', standar: ['KPS 13', 'KPS 14', 'KPS 15', 'KPS 16'] },
            { bulan: 'Juni', standar: ['KPS 17', 'KPS 18', 'KPS 19'] },
        ]
    },
    {
        pokja: 'MFK', totalStandar: 16,
        jadwal: [
            { bulan: 'Januari', standar: ['Pembahasan Anggota Tim'] },
            { bulan: 'Februari', standar: ['MFK 1', 'MFK 2', 'MFK 3'] },
            { bulan: 'Maret', standar: ['MFK 4', 'MFK 5', 'MFK 5.1'] },
            { bulan: 'April', standar: ['MFK 6', 'MFK 7', 'MFK 8', 'MFK 8.1'] },
            { bulan: 'Mei', standar: ['MFK 8.2', 'MFK 8.2.1', 'MFK 8.3'] },
            { bulan: 'Juni', standar: ['MFK 9', 'MFK 10', 'MFK 11'] },
        ]
    },
    {
        pokja: 'PMKP', totalStandar: 12,
        jadwal: [
            { bulan: 'Januari', standar: ['Pembahasan Anggota Tim'] },
            { bulan: 'Februari', standar: ['PMKP 1', 'PMKP 2', 'PMKP 3'] },
            { bulan: 'Maret', standar: ['PMKP 4', 'PMKP 4.1'] },
            { bulan: 'April', standar: ['PMKP 5', 'PMKP 6', 'PMKP 7'] },
            { bulan: 'Mei', standar: ['PMKP 8', 'PMKP 9'] },
            { bulan: 'Juni', standar: ['PMKP 10', 'PMKP 11'] },
        ]
    },
    {
        pokja: 'PPK', totalStandar: 6,
        jadwal: [
            { bulan: 'Januari', standar: ['Pembahasan Anggota Tim'] },
            { bulan: 'Februari', standar: ['PPK 1'] },
            { bulan: 'Maret', standar: ['PPK 2'] },
            { bulan: 'April', standar: ['PPK 3'] },
            { bulan: 'Mei', standar: ['PPK 4', 'PPK 5'] },
            { bulan: 'Juni', standar: ['PPK 6'] },
        ]
    },
    {
        pokja: 'PROGNAS', totalStandar: 12,
        jadwal: [
            { bulan: 'Januari', standar: ['Pembahasan Anggota Tim'] },
            { bulan: 'Februari', standar: ['PROGNAS 1', 'PROGNAS 1.1'] },
            { bulan: 'Maret', standar: ['PROGNAS 2', 'PROGNAS 2.1', 'PROGNAS 2.2'] },
            { bulan: 'April', standar: ['PROGNAS 3', 'PROGNAS 4', 'PROGNAS 4.1'] },
            { bulan: 'Mei', standar: ['PROGNAS 5', 'PROGNAS 5.1'] },
            { bulan: 'Juni', standar: ['PROGNAS 6', 'PROGNAS 6.1'] },
        ]
    },
    {
        pokja: 'SKP', totalStandar: 8,
        jadwal: [
            { bulan: 'Januari', standar: ['Pembahasan Anggota Tim'] },
            { bulan: 'Februari', standar: ['SKP 1', 'SKP 2'] },
            { bulan: 'Maret', standar: ['SKP 3', 'SKP 3.1'] },
            { bulan: 'April', standar: ['SKP 4'] },
            { bulan: 'Mei', standar: ['SKP 5'] },
            { bulan: 'Juni', standar: ['SKP 6', 'SKP 6.1'] },
        ]
    },
    {
        pokja: 'KE', totalStandar: 7,
        jadwal: [
            { bulan: 'Januari', standar: ['Pembahasan Anggota Tim'] },
            { bulan: 'Februari', standar: ['KE 1', 'KE 2'] },
            { bulan: 'Maret', standar: ['KE 3'] },
            { bulan: 'April', standar: ['KE 4'] },
            { bulan: 'Mei', standar: ['KE 5'] },
            { bulan: 'Juni', standar: ['KE 6', 'KE 7'] },
        ]
    },
    {
        pokja: 'HPK', totalStandar: 13,
        jadwal: [
            { bulan: 'Januari', standar: ['Pembahasan Anggota Tim'] },
            { bulan: 'Februari', standar: ['HPK 1', 'HPK 1.1', 'HPK 1.2'] },
            { bulan: 'Maret', standar: ['HPK 1.3', 'HPK 1.4', 'HPK 1.5'] },
            { bulan: 'April', standar: ['HPK 2', 'HPK 2.1', 'HPK 2.2'] },
            { bulan: 'Mei', standar: ['HPK 3', 'HPK 4'] },
            { bulan: 'Juni', standar: ['HPK 4.1', 'HPK 4.2'] },
        ]
    },
    {
        pokja: 'PPI', totalStandar: 19,
        jadwal: [
            { bulan: 'Januari', standar: ['Pembahasan Anggota Tim'] },
            { bulan: 'Februari', standar: ['PPI 1', 'PPI 1.1', 'PPI 2', 'PPI 3'] },
            { bulan: 'Maret', standar: ['PPI 4', 'PPI 4.1', 'PPI 5', 'PPI 6'] },
            { bulan: 'April', standar: ['PPI 7', 'PPI 7.1', 'PPI 7.2', 'PPI 8'] },
            { bulan: 'Mei', standar: ['PPI 9', 'PPI 10', 'PPI 10.1'] },
            { bulan: 'Juni', standar: ['PPI 11', 'PPI 11.1', 'PPI 12', 'PPI 13'] },
        ]
    },
    {
        pokja: 'MRMIK', totalStandar: 16,
        jadwal: [
            { bulan: 'Januari', standar: ['Pembahasan Anggota Tim'] },
            { bulan: 'Februari', standar: ['MRMIK 1', 'MRMIK 2', 'MRMIK 2.1', 'MRMIK 2.2'] },
            { bulan: 'Maret', standar: ['MRMIK 3', 'MRMIK 4', 'MRMIK 5'] },
            { bulan: 'April', standar: ['MRMIK 6', 'MRMIK 7', 'MRMIK 8'] },
            { bulan: 'Mei', standar: ['MRMIK 9', 'MRMIK 10', 'MRMIK 11'] },
            { bulan: 'Juni', standar: ['MRMIK 12', 'MRMIK 13', 'MRMIK 13.1'] },
        ]
    },
    {
        pokja: 'AKP', totalStandar: 18,
        jadwal: [
            { bulan: 'Januari', standar: ['Pembahasan Anggota Tim'] },
            { bulan: 'Februari', standar: ['AKP 1', 'AKP 1.1', 'AKP 1.2'] },
            { bulan: 'Maret', standar: ['AKP 1.3', 'AKP 2', 'AKP 2.1'] },
            { bulan: 'April', standar: ['AKP 3', 'AKP 3.1', 'AKP 4', 'AKP 4.1', 'AKP 5'] },
            { bulan: 'Mei', standar: ['AKP 5.1', 'AKP 5.2', 'AKP 5.3', 'AKP 5.4'] },
            { bulan: 'Juni', standar: ['AKP 5.5', 'AKP 5.6', 'AKP 5.7', 'AKP 6'] },
        ]
    },
    {
        pokja: 'PP', totalStandar: 21,
        jadwal: [
            { bulan: 'Januari', standar: ['Pembahasan Anggota Tim'] },
            { bulan: 'Februari', standar: ['PP 1', 'PP 1.1', 'PP 1.2', 'PP 1.3'] },
            { bulan: 'Maret', standar: ['PP 2', 'PP 3', 'PP 3.1', 'PP 3.2'] },
            { bulan: 'April', standar: ['PP 3.3', 'PP 3.4', 'PP 3.5', 'PP 3.6'] },
            { bulan: 'Mei', standar: ['PP 3.7', 'PP 3.8', 'PP 3.9', 'PP 4', 'PP 4.1'] },
            { bulan: 'Juni', standar: ['PP 4.2', 'PP 4.3', 'PP 4.4', 'PP 4.5'] },
        ]
    },
    {
        pokja: 'PAP', totalStandar: 14,
        jadwal: [
            { bulan: 'Januari', standar: ['Pembahasan Anggota Tim'] },
            { bulan: 'Februari', standar: ['PAP 1', 'PAP 1.1', 'PAP 1.2'] },
            { bulan: 'Maret', standar: ['PAP 2', 'PAP 2.1', 'PAP 2.2'] },
            { bulan: 'April', standar: ['PAP 2.3', 'PAP 2.4', 'PAP 2.5'] },
            { bulan: 'Mei', standar: ['PAP 2.6', 'PAP 2.7', 'PAP 3'] },
            { bulan: 'Juni', standar: ['PAP 4', 'PAP 5'] },
        ]
    },
    {
        pokja: 'PAB', totalStandar: 14,
        jadwal: [
            { bulan: 'Januari', standar: ['Pembahasan Anggota Tim'] },
            { bulan: 'Februari', standar: ['PAB 1', 'PAB 2', 'PAB 3'] },
            { bulan: 'Maret', standar: ['PAB 3.1', 'PAB 3.2', 'PAB 4'] },
            { bulan: 'April', standar: ['PAB 5', 'PAB 6', 'PAB 6.1'] },
            { bulan: 'Mei', standar: ['PAB 7', 'PAB 7.1', 'PAB 7.2'] },
            { bulan: 'Juni', standar: ['PAB 7.3', 'PAB 7.4'] },
        ]
    },
    {
        pokja: 'PKPO', totalStandar: 14,
        jadwal: [
            { bulan: 'Januari', standar: ['Pembahasan Anggota Tim'] },
            { bulan: 'Februari', standar: ['PKPO 1', 'PKPO 2', 'PKPO 3'] },
            { bulan: 'Maret', standar: ['PKPO 3.1', 'PKPO 3.2', 'PKPO 3.3'] },
            { bulan: 'April', standar: ['PKPO 4', 'PKPO 4.1', 'PKPO 5'] },
            { bulan: 'Mei', standar: ['PKPO 5.1', 'PKPO 6', 'PKPO 6.1'] },
            { bulan: 'Juni', standar: ['PKPO 7', 'PKPO 7.1'] },
        ]
    },
]

/**
 * Cari data target untuk Pokja tertentu
 */
export function getTargetPokja(pokjaCode: string): TargetPokja | undefined {
    return TARGET_PER_POKJA.find(t => t.pokja === pokjaCode)
}

/**
 * Hitung akumulasi standar yang seharusnya sudah selesai sampai bulan X
 */
export function getStandarKumulatif(pokjaCode: string, sampaiBulan: number): string[] {
    const target = getTargetPokja(pokjaCode)
    if (!target) return []
    const result: string[] = []
    const bulanNames = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    for (let b = 1; b <= sampaiBulan; b++) {
        const jadwal = target.jadwal.find(j => j.bulan === bulanNames[b])
        if (jadwal) result.push(...jadwal.standar)
    }
    return result
}
