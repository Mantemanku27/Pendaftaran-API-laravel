<?php

namespace App\Domain\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Biodata
 * @package App\Domain\Entities
 */
class Biodata extends Model
{
    use SoftDeletes;

    /**
     * @var array
     */
    protected $fillable = [
        'nama_lengkap', 'email', 'jk', 'agama', 'tempat_lahir', 'tanggal_lahir', 'alamat', 'desa', 'kecamatan', 'kabupaten', 'provinsi', 'jurusan', 'users_id',
    ];
    protected $with = ['users','jurusans'];

    public function users()
    {
        return $this->belongsTo('App\Domain\Entities\User', 'users_id');
    }
        public function jurusans()
    {
        return $this->belongsTo('App\Domain\Entities\Jurusan', 'jurusan');
    }

}
